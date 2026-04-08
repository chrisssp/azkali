import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Button, ButtonText } from '@/components/ui/button';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from '@/components/ui/form-control';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from '@/components/ui/select';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalBody,
} from '@/components/ui/modal';
import { CalendarDaysIcon, ChevronDownIcon } from '@/components/ui/icon';
import type { RegisterStepProps } from '../types';

// ─── Calendar constants ───────────────────────────────────────────────────────

const WEEKDAYS = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const SEX_OPTIONS = [
  { label: 'Femenino', value: 'femenino' },
  { label: 'Masculino', value: 'masculino' },
  { label: 'Otro', value: 'otro' },
  { label: 'Prefiero no decirlo', value: 'no_decir' },
];

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

// ─── Calendar built entirely from Gluestack UI components ────────────────────

interface CalendarPickerProps {
  value: string; // DD/MM/AAAA
  onChange: (val: string) => void;
  onClose: () => void;
}

function CalendarPicker({ value, onChange, onClose }: CalendarPickerProps) {
  const today = new Date();

  const parsedFromValue: Date | null = (() => {
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      const [d, m, y] = value.split('/').map(Number);
      const date = new Date(y, m - 1, d);
      if (!isNaN(date.getTime())) return date;
    }
    return null;
  })();

  const defaultYear = today.getFullYear() - 18;
  const [viewYear, setViewYear] = useState(parsedFromValue?.getFullYear() ?? defaultYear);
  const [viewMonth, setViewMonth] = useState(parsedFromValue?.getMonth() ?? today.getMonth());
  const [selected, setSelected] = useState<Date | null>(parsedFromValue);

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const handleConfirm = () => {
    if (selected) {
      onChange(
        `${pad2(selected.getDate())}/${pad2(selected.getMonth() + 1)}/${selected.getFullYear()}`,
      );
    }
    onClose();
  };

  return (
    <VStack space="md">
      {/* Month / year navigation */}
      <HStack className="items-center justify-between px-1">
        <Pressable onPress={prevMonth} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ChevronLeft size={20} color="#111827" />
        </Pressable>
        <Text className="text-base font-semibold text-typography-900">
          {MONTHS[viewMonth]} {viewYear}
        </Text>
        <Pressable onPress={nextMonth} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ChevronRight size={20} color="#111827" />
        </Pressable>
      </HStack>

      {/* Weekday headers */}
      <View style={{ flexDirection: 'row' }}>
        {WEEKDAYS.map(w => (
          <View key={w} style={{ flex: 1, alignItems: 'center', paddingVertical: 2 }}>
            <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '600' }}>{w}</Text>
          </View>
        ))}
      </View>

      {/* Day grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {cells.map((day, idx) => {
          if (!day) {
            return <View key={`e${idx}`} style={{ width: '14.2857%', height: 38 }} />;
          }

          const thisDate = new Date(viewYear, viewMonth, day);
          const isFuture = thisDate > today;
          const isSelected =
            selected?.getDate() === day &&
            selected?.getMonth() === viewMonth &&
            selected?.getFullYear() === viewYear;

          return (
            <View key={day} style={{ width: '14.2857%', alignItems: 'center', marginBottom: 2 }}>
              <Pressable
                onPress={() => { if (!isFuture) setSelected(thisDate); }}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isSelected ? '#000' : 'transparent',
                  opacity: isFuture ? 0.25 : 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: isSelected ? '#fff' : '#111827',
                    fontWeight: isSelected ? '700' : '400',
                  }}
                >
                  {day}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>

      {/* Action buttons */}
      <HStack space="sm" className="justify-end pt-2">
        <Button variant="outline" size="sm" className="rounded-xl" onPress={onClose}>
          <ButtonText className="text-typography-700 text-sm">Cancelar</ButtonText>
        </Button>
        <Button
          size="sm"
          className="bg-black rounded-xl"
          onPress={handleConfirm}
          isDisabled={!selected}
        >
          <ButtonText className="text-white text-sm">Confirmar</ButtonText>
        </Button>
      </HStack>
    </VStack>
  );
}

// ─── Step ─────────────────────────────────────────────────────────────────────

export function RegisterStep3({ form }: RegisterStepProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <VStack space="md">
      {/* Fecha de nacimiento */}
      <FormControl isInvalid={!!errors.birthDate}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            Fecha de nacimiento
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="birthDate"
          rules={{ required: 'La fecha de nacimiento es obligatoria' }}
          render={({ field: { onChange, value } }) => (
            <>
              <Input variant="outline" size="lg" className="rounded-xl mt-1">
                <InputField
                  value={value}
                  editable={false}
                  placeholder="DD/MM/AAAA"
                  className="text-typography-900"
                />
                <InputSlot className="pr-3" onPress={() => setShowCalendar(true)}>
                  <InputIcon as={CalendarDaysIcon} className="text-typography-400" />
                </InputSlot>
              </Input>

              <Modal isOpen={showCalendar} onClose={() => setShowCalendar(false)} size="md">
                <ModalBackdrop />
                <ModalContent>
                  <ModalBody>
                    <CalendarPicker
                      value={value}
                      onChange={(val) => { onChange(val); setShowCalendar(false); }}
                      onClose={() => setShowCalendar(false)}
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </>
          )}
        />
        {errors.birthDate && (
          <FormControlError>
            <FormControlErrorText>{errors.birthDate.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Sexo */}
      <FormControl isInvalid={!!errors.sex}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium text-typography-700">
            Sexo
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="sex"
          rules={{ required: 'Selecciona una opción' }}
          render={({ field: { onChange, value } }) => (
            <Select onValueChange={onChange} selectedValue={value}>
              <SelectTrigger variant="outline" size="lg" className="rounded-xl mt-1">
                <SelectInput placeholder="Selecciona..." />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {SEX_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} label={opt.label} value={opt.value} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          )}
        />
        {errors.sex && (
          <FormControlError>
            <FormControlErrorText>{errors.sex.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </VStack>
  );
}
