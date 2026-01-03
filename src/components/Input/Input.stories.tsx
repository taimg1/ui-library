import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input, { type InputProps } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    clearable: { control: "boolean" },
    type: {
      control: "select",
      options: ["text", "password", "email", "number"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    defaultValue: "secret123",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    error: "Please enter a valid email address",
    defaultValue: "invalid-email",
  },
};

// --- ВИПРАВЛЕННЯ 1: Виносимо логіку Clearable в окремий компонент ---
const ClearableDemo = (args: InputProps) => {
  const [value, setValue] = useState("This text can be cleared");

  return (
    <div className="w-80">
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
      />
    </div>
  );
};

export const Clearable: Story = {
  render: (args) => <ClearableDemo {...args} />,
  args: {
    label: "Clearable Input",
    clearable: true,
    placeholder: "Type something...",
  },
};

// --- ВИПРАВЛЕННЯ 2: Виносимо логіку React Hook Form в окремий компонент ---
const RHFDemo = () => {
  interface FormData {
    username: string;
    email: string;
    password: string;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert(`Form submitted successfully!\n\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-96 space-y-4">
      <Controller
        name="username"
        control={control}
        rules={{
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Username must be at least 3 characters",
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            label="Username"
            placeholder="Enter username"
            error={errors.username?.message}
            clearable
            onClear={() => field.onChange("")}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            type="email"
            label="Email"
            placeholder="Enter email"
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            type="password"
            label="Password"
            placeholder="Enter password"
            error={errors.password?.message}
          />
        )}
      />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export const WithReactHookForm: Story = {
  render: () => <RHFDemo />,
};