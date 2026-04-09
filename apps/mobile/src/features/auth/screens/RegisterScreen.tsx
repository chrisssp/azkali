import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterLayout } from "../components/RegisterLayout";
import type { RegisterFormData, RegisterStep } from "../types";
import { RegisterStep1 } from "./RegisterStep1";
import { RegisterStep2 } from "./RegisterStep2";
import { RegisterStep3 } from "./RegisterStep3";
import { RegisterStep5 as RegisterStepPersonalizame } from "./RegisterStep4";
import { RegisterStep6 as RegisterStepFinancial } from "./RegisterStep5";
const STEP_TITLES: Record<RegisterStep, string> = {
	1: "Registrarse",
	2: "Registrarse",
	3: "Datos personales",
	4: "Personalízame",
	5: "Meta financiera",
};

// Fields that must pass validation before advancing each step
const STEP_FIELDS: Record<RegisterStep, (keyof RegisterFormData)[]> = {
	1: ["firstName", "paternalLastName", "maternalLastName"],
	2: ["emailOrPhone", "password", "confirmPassword"],
	3: ["birthDate", "sex"],
	4: ["profileType", "personality", "interests", "monthlyIncome"],
	5: ["financialGoals"],
};

export function RegisterScreen() {
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState<RegisterStep>(1);

	const form = useForm<RegisterFormData>({
		defaultValues: {
			firstName: "",
			paternalLastName: "",
			maternalLastName: "",
			emailOrPhone: "",
			password: "",
			confirmPassword: "",
			birthDate: "",
			sex: "",
			monthlyIncome: "",
			profileType: "",
			personality: [],
			interests: [],
			financialGoals: [],
		},
		mode: "onTouched",
	});

	const handleBack = () => {
		if (currentStep === 1) {
			router.back();
		} else {
			setCurrentStep((prev) => (prev - 1) as RegisterStep);
		}
	};

	const handleContinue = async () => {
		const fieldsToValidate = STEP_FIELDS[currentStep];
		const isValid = await form.trigger(fieldsToValidate);

		if (!isValid) return;

		if (currentStep < 5) {
			setCurrentStep((prev) => (prev + 1) as RegisterStep);
		} else {
			// All steps complete — form data available in form.getValues()
			// TODO: wire up to registration API when ready
			console.log("Register form data:", form.getValues());
			router.push("/verify");
		}
	};

	const renderStep = () => {
		switch (currentStep) {
			case 1:
				return <RegisterStep1 form={form} />;
			case 2:
				return <RegisterStep2 form={form} />;
			case 3:
				return <RegisterStep3 form={form} />;
			case 4:
				return <RegisterStepPersonalizame form={form} />;
			case 5:
				return <RegisterStepFinancial form={form} />;
		}
	};

	return (
		<>
			<StatusBar style="light" />
			<RegisterLayout
				title={STEP_TITLES[currentStep]}
				currentStep={currentStep}
				onBack={handleBack}
				onContinue={handleContinue}
			totalSteps={5}
			>
				{renderStep()}
			</RegisterLayout>
		</>
	);
}
