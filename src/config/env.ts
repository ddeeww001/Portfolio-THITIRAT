// src/config/env.ts
// Single place that reads and validates every VITE_* setting.
// Only values that should NOT be hardcoded live in .env:
//   • VITE_USER_PHONE — personal phone number (shown only as a "Call" icon, never as text)
//   • feature flags (security mode, Self-XSS warning, …)
// Public profile data (name, email, GitHub, socials) is in src/config/profile.ts instead.
// A missing value becomes '' and the UI hides whatever depends on it.
import { deepFreeze } from '../shared/lib/security';

export const SECURITY_MODES = ['strict', 'standard'] as const;
export type SecurityMode = (typeof SECURITY_MODES)[number];

const str = (value: string | undefined): string => value?.trim() ?? '';

/** Accepts only "true" / "false" (case-insensitive); anything else uses the fallback. */
function parseBool(value: string | undefined, fallback: boolean): boolean {
  const v = value?.trim().toLowerCase();
  if (v === 'true') return true;
  if (v === 'false') return false;
  return fallback;
}

/** Unknown or misspelled modes fall back to the safest option, "strict". */
function parseSecurityMode(value: string | undefined): SecurityMode {
  const v = value?.trim().toLowerCase() ?? '';
  return (SECURITY_MODES as readonly string[]).includes(v) ? (v as SecurityMode) : 'strict';
}

/**
 * Pure function: builds the app config from an env object.
 * Kept separate from import.meta.env so tests can pass any env they need.
 */
export function parseEnvConfig(env: Partial<ImportMetaEnv>) {
  return {
    phone: str(env.VITE_USER_PHONE),
    // NOT YET USED: no code reads securityMode yet. Validated so a typo can't slip through.
    securityMode: parseSecurityMode(env.VITE_SECURITY_MODE),
    // Used by initSecurityGuards() in main.tsx.
    enableSelfXssWarning: parseBool(env.VITE_ENABLE_SELF_XSS_WARNING, true),
    // NOT YET USED: reserved for a future security logging feature.
    enableSecurityLogs: parseBool(env.VITE_ENABLE_SECURITY_LOGS, true),
    // NOT YET USED: reserved for a future CSP enforcement test mode.
    testCspEnforce: parseBool(env.VITE_TEST_CSP_ENFORCE, false),
  };
}

export type EnvConfig = ReturnType<typeof parseEnvConfig>;

export const ENV_CONFIG: Readonly<EnvConfig> = deepFreeze(parseEnvConfig(import.meta.env));
