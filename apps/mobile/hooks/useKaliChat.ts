import { useCallback, useEffect, useMemo, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as ImagePicker from "expo-image-picker";
import type { KaliUserContext } from "@/constants/kaliPrompts";
import {
  buildKaliBaseSystemPrompt,
  KALI_PROMPT_DOCUMENT_ANALYSIS_SYSTEM,
  KALI_PROMPT_DOCUMENT_USER_CAPTION,
  KALI_PROMPT_FOLLOWUP_PLAN_HINT,
  KALI_PROMPT_OPENING_FOLLOWUP,
  KALI_PROMPT_OPENING_REMINDER,
  KALI_PROMPT_OPENING_REPORT,
  KALI_PROMPT_REMINDER_FOLLOWUP_HINT,
  KALI_PROMPT_REPORT_STRUCTURE_HINT,
} from "@/constants/kaliPrompts";
import { assetToGeminiInlineData } from "@/utils/imageToBase64";

const LOG_PREFIX = "[KaliChat]";
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash-lite";
const FALLBACK_ERROR_MESSAGE = "Kali no esta disponible en este momento, intenta de nuevo";

export type KaliShortcut = "reminder" | "document" | "followup" | "report";

export type KaliContentPart =
  | { text: string }
  | { inlineData: { mimeType: string; data: string } };

export interface KaliChatMessage {
  role: "user" | "model";
  parts: KaliContentPart[];
}

function getGeminiModelId(): string {
  const fromEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env?.EXPO_PUBLIC_GEMINI_MODEL?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_GEMINI_MODEL;
}

function maskKey(key: string | undefined): string {
  if (!key) return "(vacía)";
  if (key.length <= 12) return "***";
  return `${key.slice(0, 8)}…${key.slice(-4)}`;
}

function partsToDisplayText(parts: KaliContentPart[]): string {
  return parts
    .map((p) => ("text" in p ? p.text : "📎 Documento (imagen adjunta)"))
    .join("\n")
    .trim();
}

function toGeminiContents(msgs: KaliChatMessage[]) {
  return msgs.map((m) => ({
    role: m.role,
    parts: m.parts.map((p) =>
      "text" in p ? { text: p.text } : { inlineData: { ...p.inlineData } }
    ),
  }));
}

export interface UseKaliChatResult {
  messages: KaliChatMessage[];
  sendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  clearChat: () => void;
  runShortcut: (shortcut: KaliShortcut) => Promise<void>;
  /** Texto plano por mensaje (para burbujas UI). */
  messagesDisplayText: (msg: KaliChatMessage) => string;
}

export function useKaliChat(userContext: KaliUserContext): UseKaliChatResult {
  const [messages, setMessages] = useState<KaliChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  /** Tras abrir atajo 1/3/4, la siguiente respuesta del usuario usa system extra una vez. */
  const [pendingSystemHint, setPendingSystemHint] = useState<string | null>(null);

  const geminiApiKey = (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env?.EXPO_PUBLIC_GEMINI_API_KEY;

  const geminiModelId = getGeminiModelId();

  const baseSystemText = useMemo(
    () => buildKaliBaseSystemPrompt(userContext),
    [userContext]
  );

  const baseModel = useMemo(() => {
    if (!geminiApiKey) return null;
    const client = new GoogleGenerativeAI(geminiApiKey);
    return client.getGenerativeModel({
      model: geminiModelId,
      systemInstruction: baseSystemText,
    });
  }, [geminiApiKey, geminiModelId, baseSystemText]);

  useEffect(() => {
    console.log(
      `${LOG_PREFIX} listo | modelo=${geminiModelId} | apiKey=${maskKey(geminiApiKey)} | user=${userContext.name}`
    );
    if (!geminiApiKey) {
      console.warn(`${LOG_PREFIX} falta EXPO_PUBLIC_GEMINI_API_KEY — no habrá respuestas reales`);
    }
  }, [geminiApiKey, geminiModelId, userContext.name]);

  const getModelForTextTurn = useCallback(
    (systemHint: string | null) => {
      if (!geminiApiKey) return null;
      if (!systemHint) return baseModel;
      const client = new GoogleGenerativeAI(geminiApiKey);
      return client.getGenerativeModel({
        model: geminiModelId,
        systemInstruction: `${baseSystemText}\n\n${systemHint}`,
      });
    },
    [geminiApiKey, geminiModelId, baseSystemText, baseModel]
  );

  const clearChat = useCallback(() => {
    console.log(`${LOG_PREFIX} clearChat — historial borrado`);
    setMessages([]);
    setPendingSystemHint(null);
  }, []);

  const messagesDisplayText = useCallback((msg: KaliChatMessage) => partsToDisplayText(msg.parts), []);

  const sendMessage = useCallback(
    async (text: string) => {
      const cleanText = text.trim();
      if (!cleanText || isLoading) return;

      const userMessage: KaliChatMessage = {
        role: "user",
        parts: [{ text: cleanText }],
      };

      let snapshot: KaliChatMessage[] = [];
      setMessages((prev) => {
        snapshot = [...prev, userMessage];
        return snapshot;
      });

      const hintForThisTurn = pendingSystemHint;
      setPendingSystemHint(null);

      const model = getModelForTextTurn(hintForThisTurn);

      setIsLoading(true);

      if (!model) {
        console.warn(`${LOG_PREFIX} sendMessage — sin modelo (sin API key)`);
        setMessages((prev) => [
          ...prev,
          { role: "model", parts: [{ text: FALLBACK_ERROR_MESSAGE }] },
        ]);
        setIsLoading(false);
        return;
      }

      try {
        console.log(
          `${LOG_PREFIX} enviando texto | historial=${snapshot.length} | hint=${hintForThisTurn ? "sí" : "no"} | "${cleanText.slice(0, 80)}${cleanText.length > 80 ? "…" : ""}"`
        );
        const response = await model.generateContent({
          contents: toGeminiContents(snapshot),
        });

        const modelText = response.response.text()?.trim() || FALLBACK_ERROR_MESSAGE;
        console.log(
          `${LOG_PREFIX} respuesta OK | chars=${modelText.length} | preview="${modelText.slice(0, 120)}${modelText.length > 120 ? "…" : ""}"`
        );

        setMessages((prev) => [
          ...prev,
          { role: "model", parts: [{ text: modelText }] },
        ]);
      } catch (error) {
        console.error(`${LOG_PREFIX} error Gemini:`, error);
        if (hintForThisTurn) setPendingSystemHint(hintForThisTurn);
        setMessages((prev) => [
          ...prev,
          { role: "model", parts: [{ text: FALLBACK_ERROR_MESSAGE }] },
        ]);
      } finally {
        setIsLoading(false);
        console.log(`${LOG_PREFIX} sendMessage — fin`);
      }
    },
    [isLoading, pendingSystemHint, getModelForTextTurn]
  );

  const runShortcut = useCallback(
    async (shortcut: KaliShortcut) => {
      if (isLoading) {
        console.warn(`${LOG_PREFIX} runShortcut ignorado — ya hay envío en curso`);
        return;
      }

      if (shortcut === "reminder") {
        setMessages((prev) => [
          ...prev,
          { role: "model", parts: [{ text: KALI_PROMPT_OPENING_REMINDER }] },
        ]);
        setPendingSystemHint(KALI_PROMPT_REMINDER_FOLLOWUP_HINT);
        console.log(`${LOG_PREFIX} atajo recordatorio — apertura inyectada`);
        return;
      }

      if (shortcut === "followup") {
        setMessages((prev) => [
          ...prev,
          { role: "model", parts: [{ text: KALI_PROMPT_OPENING_FOLLOWUP }] },
        ]);
        setPendingSystemHint(KALI_PROMPT_FOLLOWUP_PLAN_HINT);
        console.log(`${LOG_PREFIX} atajo seguimiento — apertura inyectada`);
        return;
      }

      if (shortcut === "report") {
        setMessages((prev) => [
          ...prev,
          { role: "model", parts: [{ text: KALI_PROMPT_OPENING_REPORT }] },
        ]);
        setPendingSystemHint(KALI_PROMPT_REPORT_STRUCTURE_HINT);
        console.log(`${LOG_PREFIX} atajo reporte — apertura inyectada`);
        return;
      }

      // document
      if (!geminiApiKey) {
        setMessages((prev) => [
          ...prev,
          { role: "model", parts: [{ text: FALLBACK_ERROR_MESSAGE }] },
        ]);
        return;
      }

      try {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!perm.granted) {
          setMessages((prev) => [
            ...prev,
            {
              role: "model",
              parts: [
                {
                  text: "Necesito permiso para ver tu galería y analizar el documento. Actívalo en los ajustes del dispositivo e inténtalo de nuevo.",
                },
              ],
            },
          ]);
          console.warn(`${LOG_PREFIX} atajo documento — permiso denegado`);
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          quality: 0.85,
          base64: true,
        });

        if (result.canceled || !result.assets?.[0]) {
          console.log(`${LOG_PREFIX} atajo documento — selección cancelada`);
          return;
        }

        const { base64, mimeType } = assetToGeminiInlineData(result.assets[0]);

        const userMessage: KaliChatMessage = {
          role: "user",
          parts: [
            { text: KALI_PROMPT_DOCUMENT_USER_CAPTION },
            { inlineData: { mimeType, data: base64 } },
          ],
        };

        let snapshot: KaliChatMessage[] = [];
        setMessages((prev) => {
          snapshot = [...prev, userMessage];
          return snapshot;
        });

        setIsLoading(true);

        const client = new GoogleGenerativeAI(geminiApiKey);
        const docModel = client.getGenerativeModel({
          model: geminiModelId,
          systemInstruction: `${baseSystemText}\n\n${KALI_PROMPT_DOCUMENT_ANALYSIS_SYSTEM}`,
        });

        console.log(`${LOG_PREFIX} atajo documento — enviando imagen (${mimeType})`);
        const response = await docModel.generateContent({
          contents: toGeminiContents(snapshot),
        });

        const modelText = response.response.text()?.trim() || FALLBACK_ERROR_MESSAGE;
        setMessages((prev) => [
          ...prev,
          { role: "model", parts: [{ text: modelText }] },
        ]);
        console.log(`${LOG_PREFIX} atajo documento — respuesta OK`);
      } catch (error) {
        console.error(`${LOG_PREFIX} atajo documento — error:`, error);
        setMessages((prev) => [
          ...prev,
          { role: "model", parts: [{ text: FALLBACK_ERROR_MESSAGE }] },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, geminiApiKey, geminiModelId, baseSystemText]
  );

  return {
    messages,
    sendMessage,
    isLoading,
    clearChat,
    runShortcut,
    messagesDisplayText,
  };
}
