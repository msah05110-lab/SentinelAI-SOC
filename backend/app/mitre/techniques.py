MITRE_TECHNIQUES = {

    "powershell": {
        "id": "T1059.001",
        "name": "PowerShell",
        "tactic": "Execution"
    },

    "cmd.exe": {
        "id": "T1059.003",
        "name": "Windows Command Shell",
        "tactic": "Execution"
    },

    "mimikatz": {
        "id": "T1003",
        "name": "OS Credential Dumping",
        "tactic": "Credential Access"
    },

    "rundll32": {
        "id": "T1218.011",
        "name": "Rundll32",
        "tactic": "Defense Evasion"
    },

    "regsvr32": {
        "id": "T1218.010",
        "name": "Regsvr32",
        "tactic": "Defense Evasion"
    },

    "wmic": {
        "id": "T1047",
        "name": "Windows Management Instrumentation",
        "tactic": "Execution"
    },

    "certutil": {
        "id": "T1105",
        "name": "Ingress Tool Transfer",
        "tactic": "Command and Control"
    }

}