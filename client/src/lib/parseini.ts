/**
 * INI File Parser Class
 * Parses INI configuration files with support for sections, comments, and various data types
 */
interface INIParserOptions {
    commentChars?: string[];
    autoType?: boolean;
    allowDuplicates?: boolean;
    preserveKeyCase?: boolean;
    preserveSectionCase?: boolean;
    defaultSection?: string;
}

export type INIData = Record<string, Record<string, string | number | boolean | Array<string | number | boolean>>>;

export class INIParser {
    options: Required<INIParserOptions>;

    constructor(options: INIParserOptions = {}) {
        this.options = {
            commentChars: options.commentChars ?? [';', '#'],
            autoType: options.autoType !== false,
            allowDuplicates: options.allowDuplicates ?? false,
            preserveKeyCase: options.preserveKeyCase ?? false,
            preserveSectionCase: options.preserveSectionCase ?? false,
            defaultSection: options.defaultSection ?? 'global',
        };
    }

    /**
     * Parse INI content from string
     * @param {string} content - The INI file content
     * @returns {object} Parsed INI data
     */
    parse(content: string): INIData {
        if (typeof content !== 'string') {
            throw new TypeError('Content must be a string');
        }

        const result: INIData = {};
        const lines = content.split(/\r?\n/);
        let currentSection: string = this.options.defaultSection;

        if (!this.options.preserveSectionCase) {
            currentSection = currentSection.toLowerCase();
        }
        result[currentSection] = {};

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            if (this._isComment(line)) continue;
            if (this._isSection(line)) {
                currentSection = this._parseSection(line);
                if (!this.options.preserveSectionCase) {
                    currentSection = currentSection.toLowerCase();
                }
                if (!result[currentSection]) {
                    result[currentSection] = {};
                }
                continue;
            }
            const keyValue = this._parseKeyValue(line);
            if (keyValue) {
                this._addKeyValue(result[currentSection], keyValue.key, keyValue.value);
            }
        }
        return result;
    }

    /**
     * Convert parsed data back to INI string format
     * @param {object} data - Parsed INI data
     * @returns {string} INI formatted string
     */
    stringify(data: INIData): string {
        if (typeof data !== 'object' || data === null) {
            throw new TypeError('Data must be an object');
        }
        let result = '';
        const sections = Object.keys(data);
        for (let i = 0; i < sections.length; i++) {
            const sectionName = sections[i];
            const sectionData = data[sectionName];
            if (sectionName !== this.options.defaultSection || sections.length > 1 || i > 0) {
                if (result) result += '\n';
                result += `[${sectionName}]\n`;
            }
            const keys = Object.keys(sectionData);
            for (const key of keys) {
                const value = sectionData[key];
                if (Array.isArray(value)) {
                    for (const item of value) {
                        result += `${key}=${this._stringifyValue(item)}\n`;
                    }
                } else {
                    result += `${key}=${this._stringifyValue(value)}\n`;
                }
            }
        }
        return result;
    }

    /**
     * Check if line is a comment
     * @private
     */
    private _isComment(line: string): boolean {
        return this.options.commentChars.some(char => line.startsWith(char));
    }

    /**
     * Check if line is a section header
     * @private
     */
    private _isSection(line: string): boolean {
        return line.startsWith('[') && line.endsWith(']') && line.length > 2;
    }

    /**
     * Parse section name from line
     * @private
     */
    private _parseSection(line: string): string {
        return line.slice(1, -1).trim();
    }

    /**
     * Parse key-value pair from line
     * @private
     */
    private _parseKeyValue(line: string): { key: string; value: string | number | boolean } | null {
        const equalIndex = line.indexOf('=');
        if (equalIndex === -1) return null;
    let key = line.slice(0, equalIndex).trim();
    let value: string | number | boolean = line.slice(equalIndex + 1).trim();
        if (!this.options.preserveKeyCase) {
            key = key.toLowerCase();
        }
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        if (this.options.autoType) {
            value = this._convertType(value);
        }
        return { key, value };
    }

    /**
     * Add key-value pair to section, handling duplicates
     * @private
     */
    private _addKeyValue(
        section: Record<string, string | number | boolean | Array<string | number | boolean>>,
        key: string,
        value: string | number | boolean
    ): void {
        if (this.options.allowDuplicates && Object.prototype.hasOwnProperty.call(section, key)) {
            if (!Array.isArray(section[key])) {
                section[key] = [section[key] as string | number | boolean];
            }
            (section[key] as Array<string | number | boolean>).push(value);
        } else {
            section[key] = value;
        }
    }

    /**
     * Convert string value to appropriate type
     * @private
     */
    private _convertType(value: string): string | number | boolean {
        if (value === '') return '';
        const lowerValue = value.toLowerCase();
        if (lowerValue === 'true' || lowerValue === 'yes' || lowerValue === 'on') {
            return true;
        }
        if (lowerValue === 'false' || lowerValue === 'no' || lowerValue === 'off') {
            return false;
        }
        if (!isNaN(Number(value)) && !isNaN(parseFloat(value))) {
            const num = parseFloat(value);
            return num % 1 === 0 ? parseInt(value, 10) : num;
        }
        return value;
    }

    /**
     * Convert value back to string for stringification
     * @private
     */
    private _stringifyValue(value: string | number | boolean): string {
        if (typeof value === 'string') {
            if (value.includes('=') || value.includes('\n') ||
                value.startsWith(' ') || value.endsWith(' ') ||
                this.options.commentChars.some(char => value.includes(char))) {
                return `"${value.replace(/"/g, '\\"')}"`;
            }
            return value;
        }
        if (typeof value === 'boolean') {
            return value ? 'true' : 'false';
        }
        return String(value);
    }

    /**
     * Get value from parsed data using dot notation
     * @param {object} data - Parsed INI data
     * @param {string} path - Dot notation path (e.g., 'section.key')
     * @param {*} defaultValue - Default value if path not found
     * @returns {*} Value at path or default value
     */
    static getValue(
        data: INIData,
        path: string,
        defaultValue: unknown = undefined
    ): unknown {
        const parts = path.split('.');
        let current: any = data;
        for (const part of parts) {
            if (current && typeof current === 'object' && Object.prototype.hasOwnProperty.call(current, part)) {
                current = current[part];
            } else {
                return defaultValue;
            }
        }
        return current;
    }

    /**
     * Set value in parsed data using dot notation
     * @param {object} data - Parsed INI data
     * @param {string} path - Dot notation path (e.g., 'section.key')
     * @param {*} value - Value to set
     */
    static setValue(
        data: INIData,
        path: string,
        value: string | number | boolean | Array<string | number | boolean>
    ): void {
        const parts = path.split('.');
        const key = parts.pop();
        let current: any = data;
        for (const part of parts) {
            if (!current[part] || typeof current[part] !== 'object') {
                current[part] = {};
            }
            current = current[part];
        }
        if (key) {
            current[key] = value;
        }
    }
}
