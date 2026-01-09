import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginFormData } from "@/schemas/LoginSchema";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";

export function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const { signIn, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    await signIn(data.email, data.password);
    navigate("/inicio");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6")}>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Entre em sua conta</h1>
        <p className="text-sm text-muted-foreground">Administrativo</p>
      </div>

      <div className="grid gap-4">
        <div>
          <Label>E-mail</Label>
          <Input {...register("email")} />
          {errors.email && (
            <span className="text-sm text-red-500">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <Label>Senha</Label>
          <div className="relative">
            <Input
              type={isVisible ? "text" : "password"}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setIsVisible((v) => !v)}
              className="absolute right-2 top-2"
            >
              {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button type="submit" disabled={isSubmitting} className="bg-red-800 dark:text-white dark:hover:text-red-800 hover:cursor-pointer">
          Entrar
        </Button>
      </div>
    </form>
  );
}
