import React from 'react';
import { Plus, Minus, CalendarCheck } from 'lucide-react';
import { Label } from './ui/label';

interface ScheduledTask {
    name: string;
    command: string;
    arguments?: string;
    workingDir?: string;
    schedule: string;
    modifier?: string;
    startTime?: string;
    startDate?: string;
    endDate?: string;
    runAsUser?: string;
    password?: string;
    runLevel?: string;
    ifExists?: string;
    enabled?: string;
    hidden?: string;
    required?: string;
    description?: string;
    idleTime?: string;
    stopOnIdle?: string;
    restartOnIdle?: string;
}

interface TasksTabProps {
    config: { scheduledTasks: ScheduledTask[] };
    setConfig: React.Dispatch<any>;
    activeConfigType: string;
    InputField: React.ComponentType<any>;
    Button: React.ComponentType<any>;
    CheckboxField: React.ComponentType<any>;
    Card: React.ComponentType<any>;
    CardContent: React.ComponentType<any>;
}

const TasksTab: React.FC<TasksTabProps> = ({
    config,
    setConfig,
    activeConfigType,
    InputField,
    Button,
    CheckboxField,
    Card,
    CardContent
}) => {
    if (activeConfigType !== 'launcher') {
        return (
            <div className="text-center py-8 text-gray-500">
                <CalendarCheck className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Scheduled Tasks configuration is only available for Launcher.ini files.</p>
                <p className="text-sm mt-1">Switch to Launcher configuration to access task settings.</p>
            </div>
        );
    }

    const handleAddTask = () => {
        const newTask: ScheduledTask = {
            name: '',
            command: '',
            schedule: 'ONCE',
            enabled: 'true',
            hidden: 'false',
            required: 'false',
            ifExists: 'replace',
            stopOnIdle: 'false',
            restartOnIdle: 'false',
        };
        setConfig((prev: any) => ({
            ...prev,
            scheduledTasks: [...(prev.scheduledTasks || []), newTask]
        }));
    };

    const handleRemoveTask = (index: number) => {
        setConfig((prev: any) => ({
            ...prev,
            scheduledTasks: prev.scheduledTasks.filter((_: any, i: number) => i !== index)
        }));
    };

    const handleUpdateTask = (index: number, field: keyof ScheduledTask, value: any) => {
        setConfig((prev: any) => ({
            ...prev,
            scheduledTasks: prev.scheduledTasks.map((task: ScheduledTask, i: number) =>
                i === index ? { ...task, [field]: value } : task
            )
        }));
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Scheduled Tasks</h2>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Scheduled Tasks</h3>
                    <Button onClick={handleAddTask} size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Task
                    </Button>
                </div>

                {(config.scheduledTasks || []).length === 0 ? (
                    <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="text-center py-8">
                            <CalendarCheck className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
                            <p className="text-gray-500">No scheduled tasks configured. Click "Add Task" to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    (config.scheduledTasks || []).map((task, index) => (
                        <Card key={index} className="mb-4">
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium">Task {index + 1}</h4>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemoveTask(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="Task Name"
                                        value={task.name || ''}
                                        onChange={(value: string) => handleUpdateTask(index, 'name', value)}
                                        placeholder="MyApp Updater"
                                        description="Unique name for the scheduled task"
                                        required
                                    />
                                    <InputField
                                        label="Command"
                                        value={task.command || ''}
                                        onChange={(value: string) => handleUpdateTask(index, 'command', value)}
                                        placeholder="%PAL:AppDir%\updater.exe"
                                        description="Command or executable to run"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="Working Directory"
                                        value={task.workingDir || ''}
                                        onChange={(value: string) => handleUpdateTask(index, 'workingDir', value)}
                                        placeholder="%PAL:AppDir%"
                                        description="The directory where the task will run"
                                    />
                                </div>
                                <div className="mb-4">
                                    <InputField
                                        label="Arguments"
                                        value={task.arguments || ''}
                                        onChange={(value: string) => handleUpdateTask(index, 'arguments', value)}
                                        placeholder="--check-for-updates"
                                        description="Command-line arguments for the command"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <InputField
                                        label="Schedule"
                                        type="select"
                                        value={task.schedule || 'ONCE'}
                                        onChange={(value: string) => handleUpdateTask(index, 'schedule', value)}
                                        placeholder={[
                                            { value: 'ONCE', label: 'Once' }, { value: 'MINUTE', label: 'Minute' }, { value: 'HOURLY', label: 'Hourly' }, { value: 'DAILY', label: 'Daily' }, { value: 'WEEKLY', label: 'Weekly' }, { value: 'MONTHLY', label: 'Monthly' }, { value: 'ONIDLE', label: 'On Idle' }, { value: 'ONSTART', label: 'On System Start' }, { value: 'ONLOGON', label: 'On Logon' }, { value: 'ONEVENT', label: 'On Event' }
                                        ]}
                                        description="When the task should run"
                                    />
                                    <InputField
                                        label="Schedule Modifier"
                                        value={task.modifier || ''}
                                        onChange={(value: string) => handleUpdateTask(index, 'modifier', value)}
                                        placeholder="15 (for MINUTE)"
                                        description="e.g., day of week for WEEKLY, minutes for MINUTE"
                                    />
                                    <InputField
                                        label="Description"
                                        value={task.description || ''}
                                        onChange={(value: string) => handleUpdateTask(index, 'description', value)}
                                        placeholder="Checks for application updates."
                                        description="A description for the task"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <InputField
                                        label="Start Time (HH:MM)"
                                        value={task.startTime || ''}
                                        onChange={(value: string) => handleUpdateTask(index, 'startTime', value)}
                                        placeholder="14:30"
                                        description="Time for the task to start"
                                    />
                                    <InputField
                                        label="Start Date (MM/DD/YYYY)"
                                        value={task.startDate || ''}
                                        onChange={(value: string) => handleUpdateTask(index, 'startDate', value)}
                                        placeholder="01/01/2025"
                                        description="Date for the task to start"
                                    />
                                    <InputField
                                        label="End Date (MM/DD/YYYY)"
                                        value={task.endDate || ''}
                                        onChange={(value: string) => handleUpdateTask(index, 'endDate', value)}
                                        placeholder="12/31/2025"
                                        description="Date for the task to expire"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <InputField
                                        label="Run As User"
                                        value={task.runAsUser || ''}
                                        onChange={(value: string) => handleUpdateTask(index, 'runAsUser', value)}
                                        placeholder="SYSTEM"
                                        description="User account to run the task (SYSTEM, user, etc.)"
                                    />
                                    <InputField
                                        label="Password"
                                        type="password"
                                        value={task.password || ''}
                                        onChange={(value: string) => handleUpdateTask(index, 'password', value)}
                                        placeholder="Leave blank if not needed"
                                        description="Password for the user account"
                                    />
                                    <InputField
                                        label="Run Level"
                                        type="select"
                                        value={task.runLevel || 'LIMITED'}
                                        onChange={(value: string) => handleUpdateTask(index, 'runLevel', value)}
                                        placeholder={[{ value: 'LIMITED', label: 'Limited' }, { value: 'HIGHEST', label: 'Highest' }]}
                                        description="Privilege level for the task"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="If Exists"
                                        type="select"
                                        value={task.ifExists || 'replace'}
                                        onChange={(value: string) => handleUpdateTask(index, 'ifExists', value)}
                                        placeholder={[{ value: 'skip', label: 'Skip' }, { value: 'backup', label: 'Backup' }, { value: 'replace', label: 'Replace' }]}
                                        description="Action if task already exists"
                                    />
                                    <InputField
                                        label="Idle Time (minutes)"
                                        value={task.idleTime || ''}
                                        onChange={(value: string) => handleUpdateTask(index, 'idleTime', value)}
                                        placeholder="10"
                                        description="Minutes of idle time before ONIDLE task runs"
                                    />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                                    <CheckboxField
                                        label="Enabled"
                                        checked={task.enabled === 'true'}
                                        onChange={(checked: boolean) => handleUpdateTask(index, 'enabled', checked ? 'true' : 'false')}
                                    />
                                    <CheckboxField
                                        label="Hidden"
                                        checked={task.hidden === 'true'}
                                        onChange={(checked: boolean) => handleUpdateTask(index, 'hidden', checked ? 'true' : 'false')}
                                    />
                                    <CheckboxField
                                        label="Required"
                                        checked={task.required === 'true'}
                                        onChange={(checked: boolean) => handleUpdateTask(index, 'required', checked ? 'true' : 'false')}
                                    />
                                    <CheckboxField
                                        label="Stop on Idle End"
                                        checked={task.stopOnIdle === 'true'}
                                        onChange={(checked: boolean) => handleUpdateTask(index, 'stopOnIdle', checked ? 'true' : 'false')}
                                    />
                                    <CheckboxField
                                        label="Restart on Idle Resume"
                                        checked={task.restartOnIdle === 'true'}
                                        onChange={(checked: boolean) => handleUpdateTask(index, 'restartOnIdle', checked ? 'true' : 'false')}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
            <Card className="bg-blue-50 border-blue-200 mt-8">
                <CardContent className="pt-4">
                    <div className="flex items-center">
                        <CalendarCheck className="w-5 h-5 text-blue-500 mr-2" />
                        <h4 className="text-sm font-medium text-blue-800">Scheduled Tasks Help</h4>
                    </div>
                    <div className="text-sm text-blue-700 mt-2 space-y-1">
                        <p>This section allows you to create, manage, and remove Windows Scheduled Tasks when your portable application starts and exits.</p>
                        <p><strong>Schedule:</strong> Defines when the task will run (e.g., `ONLOGON`, `DAILY`).</p>
                        <p><strong>Command:</strong> The program or script to execute. Use PAL variables like <code>%PAL:AppDir%</code> for portability.</p>
                        <p><strong>Run As User:</strong> Specify the user account for the task. `SYSTEM` provides high privileges. Leave blank for the current user.</p>
                        <p><strong>Activation:</strong> Ensure the <code>Windows Tasks</code> feature is enabled in the <em>Features</em> tab for these settings to take effect.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TasksTab;