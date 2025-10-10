export interface TestKeyPressProps {
    defaultValue?: Date | [Date | null, Date | null] | null;
    format?: string;
    expectedValue: string;
    key: string;
}
