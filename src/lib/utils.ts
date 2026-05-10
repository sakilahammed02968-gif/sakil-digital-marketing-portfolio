import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function firstName(name?: string | null) { return name?.split(/[ .]+/).find(Boolean) ?? "there"; }
