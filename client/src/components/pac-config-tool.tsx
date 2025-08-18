/** @format */

import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/hooks/use-toast";
import {
    Save,
    Upload,
    Download,
    Play,
    Settings,
    FolderOpen,
    Plus,
    Minus,
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle,
    Info,
    Folder,
    Moon,
    Sun,
    FileText,
    Book,
} from "lucide-react";

// Import tab components
import AppInfoTab from "./AppInfoTab";
import LaunchTab from "./LaunchTab";
import FeaturesTab from "./FeaturesTab";
import RegistryTab from "./RegistryTab";
import FilesTab from "./FilesTab";
import ServicesTab from "./ServicesTab";
import AdvancedTab from "./AdvancedTab";

const PACConfigTool = () => {
    const { toast } = useToast();
    const { theme, setTheme } = useTheme();
    const [config, setConfig] = useState({
        appInfo: {
            // [Details] section
            name: "",
            appId: "",
            publisher: "",
            homepage: "",
            category: "",
            description: "",
            language: "Multilingual",
            trademarks: "",
            installType: "",
            // [Version] section
            packageVersion: "1.0.0.0",
            displayVersion: "1.0",
            // [License] section
            shareable: "true",
            openSource: "false",
            freeware: "true",
            commercialUse: "true",
            eulaVersion: "1",
            // [Control] section
            icons: "1",
            start: "",
            extractIcon: "",
            // [Team] section
            developer: "",
            contributors: "",
            creator: "",
            certSigning: "false",
            certAlgorithm: "sha256",
            certExtension: "pfx",
            certTimestamp: "http://timestamp.sectigo.com/",
            // [SpecialPaths] section
            plugins: "",
        },
        launch: {
            appName: "",
            programExecutable: "",
            programExecutable64: "",
            programExecutableWhenParameters: "",
            commandLineArguments: "",
            workingDirectory: "",
            runAsAdmin: "none",
            cleanTemp: "false",
            singlePortableAppInstance: "false",
            singleAppInstance: "true",
            closeEXE: "",
            splashTime: "1500",
            launchAfterSplashScreen: "false",
            waitForProgram: "true",
            waitForOtherInstances: "true",
            refreshShellIcons: "none",
            hideCommandLineWindow: "false",
            noSpacesInPath: "false",
        },
        activate: {
            registry: "false",
            regRedirection: "false",
            regCopyKeys: "false",
            redirection: "false",
            forceRedirection: "false",
            execAsUser: "false",
            services: "false",
            regDLLs: "false",
            tasks: "false",
            java: "none",
            jdk: "false",
            xml: "false",
            ghostscript: "false",
            fontsFolder: "false",
            fileCleanup: "false",
            directoryCleanup: "false",
        },
        dependencies: {
            elevatedPrivileges: "false",
            usesJava: "false",
            usesGhostscript: "false",
            usesDotNetVersion: "",
            useStdUtils: "false",
            installINF: "false",
            registryValueWrite: "false",
            fileWriteReplace: "false",
            fileLocking: "false",
            firewall: "false",
            junctions: "false",
            aclRegSupport: "false",
            aclDirSupport: "false",
            rmEmptyDir: "false",
            localLow: "false",
            publicDoc: "false",
            compareVersions: "false",
            configFunctions: "false",
            closeWindow: "false",
            jsonSupport: "false",
            restartSleep: "",
            winMessages: "false",
            lineWrite: "false",
            trimString: "false",
            closeProcess: "false",
            include64: "false",
            includeWordRep: "false",
            getBetween: "false",
        },
        liveMode: {
            copyApp: "false",
        },
        environment: [] as { name: string; value: string }[],
        registryKeys: [] as { name: string; path: string }[],
        registryValues: [] as { key: string; type: string; value: string }[],
        registryCleanupIfEmpty: [],
        registryCleanupForce: [],
        registryValueBackupDelete: [],
        registryCopyKeys: [],
        fileWrites: [],
        filesMove: [] as { source: string; destination: string }[],
        filesCleanup: [],
        directoriesMove: [],
        directoriesCleanupIfEmpty: [],
        directoriesCleanupForce: [],
        registerDLLs: [],
        services: [] as { name: string; path: string; type?: string; start?: string; depend?: string; ifExists?: string }[],
        taskCleanup: [],
        language: {
            base: "%PortableApps.comLocaleglibc%",
            default: "en",
            checkIfExists: "",
            defaultIfNotExists: "",
        },
        languageStrings: [],
    });

    const [activeTab, setActiveTab] = useState("appInfo");
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [activeConfigType, setActiveConfigType] = useState("launcher");

    // Validation logic
    const validateConfig = () => {
        const errors = [];

        if (activeConfigType === "launcher") {
            if (!config.launch.programExecutable.trim()) {
                errors.push("Program Executable is required");
            }
        } else {
            if (!config.appInfo.name.trim()) {
                errors.push("App Name is required");
            }
            if (!config.appInfo.appId.trim()) {
                errors.push("AppID is required");
            }
            if (!config.appInfo.packageVersion.trim()) {
                errors.push("Package Version is required");
            }
            if (!config.appInfo.start.trim()) {
                errors.push("Start command is required");
            }
        }

        setValidationErrors(errors);
        return errors.length === 0;
    };

    useEffect(() => {
        validateConfig();
    }, [config, activeConfigType]);

    const addArrayItem = (section: keyof typeof config, newItem: any) => {
        setConfig((prev) => {
            const currentSection = prev[section];
            if (Array.isArray(currentSection)) {
                return {
                    ...prev,
                    [section]: [...currentSection, newItem],
                };
            } else {
                // Optionally handle non-array sections or throw an error
                console.warn(`Section "${section}" is not an array.`);
                return prev;
            }
        });
    };

    const removeArrayItem = (section: keyof typeof config, index: number) => {
        setConfig((prev) => {
            const currentSection = prev[section];
            if (Array.isArray(currentSection)) {
                return {
                    ...prev,
                    [section]: currentSection.filter((_, i) => i !== index),
                };
            } else {
                console.warn(`Section "${section}" is not an array.`);
                return prev;
            }
        });
    };

    const updateArrayItem = (
        section: keyof typeof config,
        index: number,
        field: string,
        value: any
    ) => {
        setConfig((prev) => ({
            ...prev,
            [section]: (prev[section] as any[]).map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };

    const generateLauncherINI = () => {
        let ini = ";=#\n";
        ini += ";\n";
        ini += "; PORTABLEAPPS COMPILER\n";
        ini += "; Generated by Pac-Man INI Generator\n\n";
        ini += "; For more information, visit:\n";
        ini += "; https://github.com/daemondevin/Pac-ManINIGenerator\n\n";

        // Launch section
        ini += "[Launch]\n";
        if (config.launch.appName) ini += `AppName=${config.launch.appName}\n`;
        ini += `ProgramExecutable=${config.launch.programExecutable}\n`;
        if (config.launch.programExecutable64)
            ini += `ProgramExecutable64=${config.launch.programExecutable64}\n`;
        if (config.launch.programExecutableWhenParameters)
            ini += `ProgramExecutableWhenParameters=${config.launch.programExecutableWhenParameters}\n`;
        if (config.launch.commandLineArguments)
            ini += `CommandLineArguments=${config.launch.commandLineArguments}\n`;
        if (config.launch.workingDirectory)
            ini += `WorkingDirectory=${config.launch.workingDirectory}\n`;
        if (config.launch.runAsAdmin !== "none")
            ini += `RunAsAdmin=${config.launch.runAsAdmin}\n`;
        if (config.launch.cleanTemp === "true")
            ini += `CleanTemp=${config.launch.cleanTemp}\n`;
        if (config.launch.singlePortableAppInstance === "true")
            ini += `SinglePortableAppInstance=${config.launch.singlePortableAppInstance}\n`;
        if (config.launch.singleAppInstance !== "true")
            ini += `SingleAppInstance=${config.launch.singleAppInstance}\n`;
        if (config.launch.closeEXE)
            ini += `CloseEXE=${config.launch.closeEXE}\n`;
        if (config.launch.splashTime !== "1500")
            ini += `SplashTime=${config.launch.splashTime}\n`;
        if (config.launch.launchAfterSplashScreen === "true")
            ini += `LaunchAfterSplashScreen=${config.launch.launchAfterSplashScreen}\n`;
        if (config.launch.waitForProgram !== "true")
            ini += `WaitForProgram=${config.launch.waitForProgram}\n`;
        if (config.launch.waitForOtherInstances !== "true")
            ini += `WaitForOtherInstances=${config.launch.waitForOtherInstances}\n`;
        if (config.launch.refreshShellIcons !== "none")
            ini += `RefreshShellIcons=${config.launch.refreshShellIcons}\n`;
        if (config.launch.hideCommandLineWindow === "true")
            ini += `HideCommandLineWindow=${config.launch.hideCommandLineWindow}\n`;
        if (config.launch.noSpacesInPath === "true")
            ini += `NoSpacesInPath=${config.launch.noSpacesInPath}\n`;
        ini += "\n";

        // Activate section
        const hasActivateOptions = Object.values(config.activate).some(v => v === 'true' || (v !== 'false' && v !== 'none' && v !== ''));
        if (hasActivateOptions) {
        ini += '[Activate]\n';
        Object.entries(config.activate).forEach(([key, value]) => {
            if (value === 'true' || (key === 'java' && value !== 'none')) {
            const iniKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, match => match);
            ini += `${iniKey}=${value}\n`;
            }
        });
        ini += '\n';
        }
        
        // Live Mode
        if (config.liveMode.copyApp === 'true') {
        ini += '[LiveMode]\n';
        ini += `CopyApp=${config.liveMode.copyApp}\n\n`;
        }
        
        // Environment
        if (config.environment.length > 0) {
        ini += '[Environment]\n';
        config.environment.forEach(env => {
            ini += `${env.name}=${env.value}\n`;
        });
        ini += '\n';
        }
        
        // Registry sections
        if (config.registryKeys.length > 0) {
        ini += '[RegistryKeys]\n';
        config.registryKeys.forEach(key => {
            ini += `${key.name}=${key.path}\n`;
        });
        ini += '\n';
        }
        
        if (config.registryValues.length > 0) {
        ini += '[RegistryValueWrite]\n';
        config.registryValues.forEach(value => {
            ini += `${value.key}=${value.type}:${value.value}\n`;
        });
        ini += '\n';
        }
        
        // File operations
        if (config.filesMove.length > 0) {
        ini += '[FilesMove]\n';
        config.filesMove.forEach(file => {
            ini += `${file.source}=${file.destination}\n`;
        });
        ini += '\n';
        }
        
        // Services
        config.services.forEach((service, index) => {
        ini += `[Service${index + 1}]\n`;
        ini += `Name=${service.name}\n`;
        ini += `Path=${service.path}\n`;
        if (service.type) ini += `Type=${service.type}\n`;
        if (service.start) ini += `Start=${service.start}\n`;
        if (service.depend) ini += `Depend=${service.depend}\n`;
        if (service.ifExists) ini += `IfExists=${service.ifExists}\n`;
        ini += '\n';
        });
        
        return ini;
    };

    const generateAppInfoINI = () => {
        let ini = ";=#\n";
        ini += ";\n";
        ini += "; PORTABLEAPPS COMPILER\n";
        ini += "; Generated by Pac-Man INI Generator\n\n";
        ini += "; For more information, visit:\n";
        ini += "; https://github.com/daemondevin/Pac-ManINIGenerator\n\n";

        ini += '[Format]\n';
        ini += 'Type=PortableApps.comFormat\n';
        ini += 'Version=3.9\n\n';
        
        ini += '[Details]\n';
        ini += `Name=${config.appInfo.name}\n`;
        ini += `AppId=${config.appInfo.appId}\n`;
        ini += `Publisher=${config.appInfo.publisher}\n`;
        ini += `Homepage=${config.appInfo.homepage}\n`;
        ini += `Category=${config.appInfo.category}\n`;
        ini += `Description=${config.appInfo.description}\n`;
        ini += `Language=${config.appInfo.language}\n`;
        if (config.appInfo.trademarks) ini += `Trademarks=${config.appInfo.trademarks}\n`;
        if (config.appInfo.installType) ini += `InstallType=${config.appInfo.installType}\n`;
        ini += '\n';
        
        if (config.appInfo.developer || config.appInfo.contributors || config.appInfo.creator || config.appInfo.certSigning === 'true') {
        ini += '[Team]\n';
        if (config.appInfo.developer) ini += `Developer=${config.appInfo.developer}\n`;
        if (config.appInfo.contributors) ini += `Contributors=${config.appInfo.contributors}\n`;
        if (config.appInfo.creator) ini += `Creator=${config.appInfo.creator}\n`;
        if (config.appInfo.certSigning === 'true') {
            ini += `CertSigning=${config.appInfo.certSigning}\n`;
            ini += `CertAlgorithm=${config.appInfo.certAlgorithm}\n`;
            ini += `CertExtension=${config.appInfo.certExtension}\n`;
            ini += `CertTimestamp=${config.appInfo.certTimestamp}\n`;
        }
        ini += '\n';
        }
        
        ini += "[License]\n";
        ini += `Shareable=${config.appInfo.shareable}\n`;
        ini += `OpenSource=${config.appInfo.openSource}\n`;
        ini += `Freeware=${config.appInfo.freeware}\n`;
        ini += `CommercialUse=${config.appInfo.commercialUse}\n`;
        if (config.appInfo.eulaVersion !== "1")
            ini += `EULAVersion=${config.appInfo.eulaVersion}\n`;
        ini += "\n";

        ini += "[Version]\n";
        ini += `PackageVersion=${config.appInfo.packageVersion}\n`;
        ini += `DisplayVersion=${config.appInfo.displayVersion}\n\n`;
    
        if (config.appInfo.plugins) {
        ini += '[SpecialPaths]\n';
        ini += `Plugins=${config.appInfo.plugins}\n\n`;
        }
        
        // Dependencies
        const hasDependencies = Object.values(config.dependencies).some(v => v === 'true' || (v !== 'false' && v !== ''));
        if (hasDependencies) {
        ini += '[Dependencies]\n';
        Object.entries(config.dependencies).forEach(([key, value]) => {
            if (value === 'true' || (value !== 'false' && value !== '')) {
            const iniKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, match => match);
            ini += `${iniKey}=${value}\n`;
            }
        });
        ini += '\n';
        }

        ini += "[Control]\n";
        ini += `Icons=${config.appInfo.icons}\n`;
        ini += `Start=${config.appInfo.start}\n`;
        if (config.appInfo.extractIcon)
            ini += `ExtractIcon=${config.appInfo.extractIcon}\n`;

        return ini;
    };

    const exportConfig = () => {
        if (!validateConfig()) {
            alert(
                "Please fix validation errors before generating configuration"
            );
            return;
        }

        const content =
            activeConfigType === "launcher"
                ? generateLauncherINI()
                : generateAppInfoINI();
        const filename =
            activeConfigType === "launcher"
                ? `${config.appInfo.appId || "app"}.ini`
                : "appinfo.ini";

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);

        toast({
            title: "Configuration Exported",
            description: `Configuration saved as ${filename}`,
        });
    };

    const importConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            if (!content) return;

            // Split the content into lines and remove comments and empty lines
            const lines = content.split("\n")
                .map(line => line.trim())
                .filter(line => line && !line.startsWith(";"));

            let currentSection = "";
            const newConfig = { ...config };
            let isAppInfo = false;

            // Detect if this is an AppInfo.ini file
            if (content.includes("[Format]") && content.includes("Type=PortableApps.comFormat")) {
                isAppInfo = true;
                setActiveConfigType("appinfo");
            } else {
                setActiveConfigType("launcher");
            }

            // Reset arrays that will be populated
            if (!isAppInfo) {
                newConfig.environment = [];
                newConfig.services = [];
                newConfig.filesMove = [];
                newConfig.registryKeys = [];
                newConfig.registryValues = [];
            }

            let currentService: any = null;

            lines.forEach(line => {
                // Section header
                if (line.startsWith("[") && line.endsWith("]")) {
                    currentSection = line.slice(1, -1).toLowerCase();
                    if (currentSection.startsWith("service")) {
                        currentService = {};
                        newConfig.services.push(currentService);
                    }
                    return;
                }

                // Key-value pair
                const [key, ...valueParts] = line.split("=");
                const value = valueParts.join("="); // Rejoin in case value contains =

                if (!key || value === undefined) return;

                const keyTrim = key.trim();
                const valueTrim = value.trim();

                if (isAppInfo) {
                    switch (currentSection.toLowerCase()) {
                        case "details":
                            if (keyTrim in newConfig.appInfo) {
                                (newConfig.appInfo as any)[keyTrim] = valueTrim;
                            }
                            break;
                        case "version":
                            if (keyTrim === "PackageVersion") newConfig.appInfo.packageVersion = valueTrim;
                            if (keyTrim === "DisplayVersion") newConfig.appInfo.displayVersion = valueTrim;
                            break;
                        case "license":
                            if (keyTrim === "Shareable") newConfig.appInfo.shareable = valueTrim;
                            if (keyTrim === "OpenSource") newConfig.appInfo.openSource = valueTrim;
                            if (keyTrim === "Freeware") newConfig.appInfo.freeware = valueTrim;
                            if (keyTrim === "CommercialUse") newConfig.appInfo.commercialUse = valueTrim;
                            if (keyTrim === "EULAVersion") newConfig.appInfo.eulaVersion = valueTrim;
                            break;
                        case "control":
                            if (keyTrim === "Icons") newConfig.appInfo.icons = valueTrim;
                            if (keyTrim === "Start") newConfig.appInfo.start = valueTrim;
                            if (keyTrim === "ExtractIcon") newConfig.appInfo.extractIcon = valueTrim;
                            break;
                        case "team":
                            if (keyTrim === "Developer") newConfig.appInfo.developer = valueTrim;
                            if (keyTrim === "Contributors") newConfig.appInfo.contributors = valueTrim;
                            if (keyTrim === "Creator") newConfig.appInfo.creator = valueTrim;
                            if (keyTrim === "CertSigning") newConfig.appInfo.certSigning = valueTrim;
                            if (keyTrim === "CertAlgorithm") newConfig.appInfo.certAlgorithm = valueTrim;
                            if (keyTrim === "CertExtension") newConfig.appInfo.certExtension = valueTrim;
                            if (keyTrim === "CertTimestamp") newConfig.appInfo.certTimestamp = valueTrim;
                            break;
                        case "specialpaths":
                            if (keyTrim === "Plugins") newConfig.appInfo.plugins = valueTrim;
                            break;
                    }
                } else {
                    switch (currentSection.toLowerCase()) {
                        case "launch":
                            if (keyTrim in newConfig.launch) {
                                (newConfig.launch as any)[keyTrim] = valueTrim;
                            }
                            break;
                        case "activate":
                            if (keyTrim in newConfig.activate) {
                                (newConfig.activate as any)[keyTrim] = valueTrim;
                            }
                            break;
                        case "environment":
                            newConfig.environment.push({
                                name: keyTrim,
                                value: valueTrim
                            });
                            break;
                        case "registrykeys":
                            newConfig.registryKeys.push({
                                name: keyTrim,
                                path: valueTrim
                            });
                            break;
                        case "registryvaluewrite":
                            const [type, val] = valueTrim.split(":", 2);
                            newConfig.registryValues.push({
                                key: keyTrim,
                                type: type,
                                value: val || ""
                            });
                            break;
                        case "filesmove":
                            newConfig.filesMove.push({
                                source: keyTrim,
                                destination: valueTrim
                            });
                            break;
                        default:
                            if (currentSection.startsWith("service") && currentService) {
                                if (keyTrim === "Name") currentService.name = valueTrim;
                                if (keyTrim === "Path") currentService.path = valueTrim;
                                if (keyTrim === "Type") currentService.type = valueTrim;
                                if (keyTrim === "Start") currentService.start = valueTrim;
                                if (keyTrim === "Depend") currentService.depend = valueTrim;
                                if (keyTrim === "IfExists") currentService.ifExists = valueTrim;
                            }
                            break;
                    }
                }
            });

            setConfig(newConfig);
            toast({
                title: "Configuration Imported",
                description: `Successfully imported ${isAppInfo ? "AppInfo.ini" : "Launcher.ini"} configuration`,
            });
        };
        reader.readAsText(file);
    };
    const tabs = [
        { id: "appInfo", label: "App Info", icon: Info },
        { id: "launch", label: "Launch", icon: Play },
        { id: "activate", label: "Features", icon: Settings },
        { id: "registry", label: "Registry", icon: FolderOpen },
        { id: "files", label: "Files & Dirs", icon: Folder },
        { id: "services", label: "Services", icon: Settings },
        { id: "advanced", label: "Advanced", icon: Settings },
    ];

    const categories = [
        "Accessibility",
        "Development",
        "Education",
        "Games",
        "Graphics & Pictures",
        "Internet",
        "Music & Video",
        "Office",
        "Security",
        "Utilities",
    ];

    const languages = [
        "Multilingual",
        "English",
        "Spanish",
        "French",
        "German",
        "Italian",
        "Portuguese",
        "Russian",
        "Chinese",
        "Japanese",
        "Korean",
        "Arabic",
    ];

    const Button = ({
        children,
        onClick,
        className = "",
        variant = "default",
        size = "default",
        ...props
    }: {
        children: React.ReactNode;
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
        className?: string;
        variant?: "default" | "outline" | "ghost" | "destructive";
        size?: "default" | "sm" | "lg" | "icon";
        [key: string]: any;
    }) => {
        const baseClasses =
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

        const variants = {
            default: "bg-blue-600 text-white hover:bg-blue-700",
            outline:
                "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700",
            ghost: "hover:bg-gray-100 hover:text-gray-900",
            destructive: "bg-red-600 text-white hover:bg-red-700",
        };

        const sizes = {
            default: "h-10 py-2 px-4",
            sm: "h-9 px-3 text-xs",
            lg: "h-11 px-8",
            icon: "h-10 w-10",
        };

        return (
            <button
                className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
                onClick={onClick}
                {...props}>
                {children}
            </button>
        );
    };

    const Input = ({ className = "", ...props }) => (
        <input
            className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        />
    );

    const Textarea = ({ className = "", ...props }) => (
        <textarea
            className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        />
    );

    const Select = ({
        value,
        onValueChange,
        children,
        className = "",
    }: {
        value: string;
        onValueChange: (value: string) => void;
        children: React.ReactNode;
        className?: string;
    }) => {
        return (
            <select
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>
                {children}
            </select>
        );
    };

    const Checkbox = ({
        checked,
        onCheckedChange,
        id,
        className = "",
    }: {
        checked: boolean;
        onCheckedChange: (checked: boolean) => void;
        id?: string;
        className?: string;
    }) => (
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onCheckedChange(e.target.checked)}
            className={`h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
        />
    );

    const Label = ({
        children,
        htmlFor,
        className = "",
    }: {
        children: React.ReactNode;
        htmlFor?: string;
        className?: string;
    }) => (
        <label
            htmlFor={htmlFor}
            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
            {children}
        </label>
    );

    const Card = ({
        children,
        className = "",
    }: {
        children: React.ReactNode;
        className?: string;
    }) => (
        <div
            className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
            {children}
        </div>
    );

    const CardContent = ({
        children,
        className = "",
    }: { children: React.ReactNode; className?: string }) => (
        <div className={`p-6 ${className}`}>{children}</div>
    );

    type InputFieldProps = {
        label: string;
        value: any;
        onChange: (value: any) => void;
        placeholder?: any;
        type?: string;
        required?: boolean;
        description?: string;
    };

    const InputField = ({
        label,
        value,
        onChange,
        placeholder,
        type = "text",
        required = false,
        description,
    }: InputFieldProps) => (
        <div className="mb-4">
            <Label className="text-sm font-medium text-gray-700 mb-1 block">
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            {type === "textarea" ? (
                <Textarea
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={3}
                />
            ) : type === "select" ? (
                <Select value={value} onValueChange={onChange}>
                    {placeholder.map((option: any) => (
                        <option
                            key={option.value || option}
                            value={option.value || option}>
                            {option.label || option}
                        </option>
                    ))}
                </Select>
            ) : (
                <Input
                    type={type}
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            )}
            {description && (
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
        </div>
    );

    type CheckboxFieldProps = {
        label: string;
        checked: boolean;
        onChange: (checked: boolean) => void;
        description?: string;
    };

    const CheckboxField = ({ label, checked, onChange, description }: CheckboxFieldProps) => (
        <div className="mb-4">
            <div className="flex items-center space-x-2">
                <Checkbox checked={checked} onCheckedChange={onChange} />
                <Label className="text-sm font-medium text-gray-700">
                    {label}
                </Label>
            </div>
            {description && (
                <p className="text-sm text-gray-500 mt-1 ml-6">{description}</p>
            )}
        </div>
    );

    type TabType = {
        id: string;
        label: string;
        icon: React.ComponentType<{ className?: string }>;
    };

    const TabButton = ({
        tab,
        isActive,
        onClick,
    }: {
        tab: TabType;
        isActive: boolean;
        onClick: () => void;
    }) => {
        const Icon = tab.icon;
        return (
            <Button
                variant="ghost"
                onClick={onClick}
                className={`w-full justify-start ${
                    isActive
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                }`}>
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
            </Button>
        );
    };

    return (
        <div
            className={`min-h-screen ${
                theme === "dark"
                    ? "dark bg-gray-900"
                    : "bg-gradient-to-br from-blue-50 to-indigo-100"
            }`}>
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                PortableApps Compiler
                            </h1>
                            <p className="text-gray-600">
                                AppInfo/Launcher INI Configuration Generator
                            </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() =>
                                        setActiveConfigType("launcher")
                                    }
                                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                                        activeConfigType === "launcher"
                                            ? "bg-white text-gray-900 shadow-sm"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}>
                                    <Settings className="w-4 h-4 mr-2" />
                                    Launcher.ini
                                </button>
                                <button
                                    onClick={() =>
                                        setActiveConfigType("appinfo")
                                    }
                                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                                        activeConfigType === "appinfo"
                                            ? "bg-white text-gray-900 shadow-sm"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}>
                                    <FileText className="w-4 h-4 mr-2" />
                                    AppInfo.ini
                                </button>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    setTheme(
                                        theme === "light" ? "dark" : "light"
                                    )
                                }>
                                {theme === "light" ? (
                                    <Moon className="h-4 w-4" />
                                ) : (
                                    <Sun className="h-4 w-4" />
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setShowAdvanced(!showAdvanced)}>
                                {showAdvanced ? (
                                    <EyeOff className="w-4 h-4 mr-2" />
                                ) : (
                                    <Eye className="w-4 h-4 mr-2" />
                                )}
                                {showAdvanced ? "Hide" : "Show"} Advanced
                            </Button>
                            <input
                                type="file"
                                accept=".ini,.txt"
                                style={{ display: "none" }}
                                id="import-config-input"
                                onChange={importConfig}
                            />
                            <Button
                                variant="outline"
                                onClick={() => {
                                    const input = document.getElementById("import-config-input") as HTMLInputElement;
                                    if (input) input.click();
                                }}>
                                <Upload className="w-4 h-4 mr-2" />
                                Import
                            </Button>
                            <Button
                                onClick={exportConfig}
                                className="bg-green-600 hover:bg-green-700">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                    <Card className="mb-6 bg-red-50 border-red-200">
                        <CardContent className="pt-4">
                            <div className="flex items-center mb-2">
                                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                                <h3 className="text-sm font-medium text-red-800">
                                    Please fix these issues:
                                </h3>
                            </div>
                            <ul className="text-sm text-red-700 list-disc ml-7">
                                {validationErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}

                <div className="flex gap-6">
                    {/* Sidebar Navigation */}
                    <div className="w-64 flex-shrink-0">
                        <Card>
                            <CardContent className="p-4">
                                <div className="space-y-2">
                                    {tabs.map((tab) => (
                                        <TabButton
                                            key={tab.id}
                                            tab={tab}
                                            isActive={activeTab === tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <Card>
                            <CardContent className="p-6">
                                {/* AppInfo Tab */}
                                {activeTab === "appInfo" && (
                                    <AppInfoTab
                                        config={config}
                                        setConfig={setConfig}
                                        activeConfigType={activeConfigType}
                                        InputField={InputField}
                                        CheckboxField={CheckboxField}
                                        categories={categories}
                                        languages={languages}
                                    />
                                )}

                                {/* Launcher Tab */}
                                {activeTab === "launch" && (
                                    <LaunchTab
                                        config={config}
                                        setConfig={setConfig}
                                        activeConfigType={activeConfigType}
                                        InputField={InputField}
                                        CheckboxField={CheckboxField}
                                    />
                                )}

                                {/* Features/Activate Tab */}
                                {activeTab === "activate" && (
                                    <FeaturesTab
                                        config={config}
                                        setConfig={setConfig}
                                        activeConfigType={activeConfigType}
                                        InputField={InputField}
                                        CheckboxField={CheckboxField}
                                    />
                                )}

                                {/* Registry Tab */}
                                {activeTab === "registry" && (
                                    <RegistryTab
                                        config={config}
                                        setConfig={setConfig}
                                        activeConfigType={activeConfigType}
                                        InputField={InputField}
                                        addArrayItem={addArrayItem}
                                        removeArrayItem={removeArrayItem}
                                        updateArrayItem={updateArrayItem}
                                        Button={Button}
                                        Card={Card}
                                        CardContent={CardContent}
                                    />
                                )}

                                {/* Files & Directories Tab */}
                                {activeTab === "files" && (
                                    <FilesTab
                                        config={config}
                                        setConfig={setConfig}
                                        activeConfigType={activeConfigType}
                                        InputField={InputField}
                                        addArrayItem={addArrayItem}
                                        removeArrayItem={removeArrayItem}
                                        updateArrayItem={updateArrayItem}
                                        Button={Button}
                                        Card={Card}
                                        CardContent={CardContent}
                                    />
                                )}

                                {/* Services Tab */}
                                {activeTab === "services" && (
                                    <ServicesTab
                                        config={config}
                                        setConfig={setConfig}
                                        showAdvanced={showAdvanced}
                                        activeConfigType={activeConfigType}
                                        InputField={InputField}
                                        addArrayItem={addArrayItem}
                                        removeArrayItem={removeArrayItem}
                                        updateArrayItem={updateArrayItem}
                                        Button={Button}
                                        Card={Card}
                                        CardContent={CardContent}
                                    />
                                )}

                                {/* Advanced Tab */}
                                {activeTab === "advanced" && (
                                    <AdvancedTab
                                        config={config}
                                        setConfig={setConfig}
                                        activeConfigType={activeConfigType}
                                        InputField={InputField}
                                        addArrayItem={addArrayItem}
                                        removeArrayItem={removeArrayItem}
                                        updateArrayItem={updateArrayItem}
                                        Button={Button}
                                        Card={Card}
                                        CardContent={CardContent}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PACConfigTool;
