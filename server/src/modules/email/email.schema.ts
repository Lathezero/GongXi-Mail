import { z } from 'zod';

export const createEmailSchema = z.object({
    email: z.string().email(),
    clientId: z.string().min(1),
    refreshToken: z.string().min(1),
    password: z.string().optional(),
    recoveryEmail: z.string().email().optional(),
    recoveryPassword: z.string().optional(),
    groupId: z.coerce.number().int().positive().optional(),
});

export const updateEmailSchema = z.object({
    email: z.string().email().optional(),
    clientId: z.string().min(1).optional(),
    refreshToken: z.string().min(1).optional(),
    password: z.string().optional(),
    recoveryEmail: z.string().email().optional(),
    recoveryPassword: z.string().optional(),
    status: z.enum(['ACTIVE', 'ERROR', 'DISABLED']).optional(),
    groupId: z.union([z.coerce.number().int().positive(), z.null()]).optional(),
});

export const listEmailSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).max(100).default(10),
    status: z.enum(['ACTIVE', 'ERROR', 'DISABLED']).optional(),
    keyword: z.string().optional(),
    groupId: z.coerce.number().int().positive().optional(),
    groupName: z.string().optional(),
});

export const importFormatEnum = z.enum([
    'auto',      // 自动猜测（兼容行为）
    'vendor6',   // email----password----clientId----refreshToken----recoveryEmail----recoveryPassword
    'vendor5',   // email----password----clientId----refreshToken----recoveryEmail
    'simple4',   // email----password----clientId----refreshToken
    'simple3',   // email----clientId----refreshToken
    'legacy5',   // email----clientId----uuid----info----refreshToken
]);

export const importEmailSchema = z.object({
    content: z.string().min(1),
    separator: z.string().default('----'),
    format: importFormatEnum.default('auto'),
    groupId: z.coerce.number().int().positive().optional(),
});

export type CreateEmailInput = z.infer<typeof createEmailSchema>;
export type UpdateEmailInput = z.infer<typeof updateEmailSchema>;
export type ListEmailInput = z.infer<typeof listEmailSchema>;
export type ImportEmailInput = z.infer<typeof importEmailSchema>;
