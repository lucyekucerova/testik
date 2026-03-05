// script.js - Simple Czech text adventure for GitHub workflow

// Game state definitions
const states = {
    start: 'start',
    installed: 'installed',
    loggedIn: 'loggedIn',
    repoCreated: 'repoCreated',
    committed: 'committed',
    pushed: 'pushed',
    finished: 'finished',
};

let currentState = states.start;

const outputDiv = document.getElementById('output');
const inputField = document.getElementById('input');

function print(text) {
    const p = document.createElement('p');
    p.textContent = text;
    outputDiv.appendChild(p);
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

function handleCommand(cmd) {
    const command = cmd.trim().toLowerCase();
    switch (currentState) {
        case states.start:
            if (command === 'instalovat') {
                print('🛠️ Instalace Gitu... Hotovo! Teď můžeš klikat na "login".');
                currentState = states.installed;
            } else {
                print('Neznámý příkaz. Zkus "instalovat".');
            }
            break;
        case states.installed:
            if (command === 'login') {
                print('🔐 Přihlašování na GitHub... Úspěšné! Vytvoř si repozitář pomocí "repo vytvořit".');
                currentState = states.loggedIn;
            } else {
                print('Neplatný příkaz. Zkus "login".');
            }
            break;
        case states.loggedIn:
            if (command === 'repo vytvořit') {
                print('📁 Repozitář vytvořen! Přidej soubor a "commit" ho.');
                currentState = states.repoCreated;
            } else {
                print('Neplatný příkaz. Zkus "repo vytvořit".');
            }
            break;
        case states.repoCreated:
            if (command === 'commit') {
                print('💾 Změny commitnuty! Nyní můžeš "push".');
                currentState = states.committed;
            } else {
                print('Neplatný příkaz. Zkus "commit".');
            }
            break;
        case states.committed:
            if (command === 'push') {
                print('🚀 Kód byl úspěšně pushnut na GitHub! Gratulace, dokončil jsi dobrodružství.');
                currentState = states.finished;
            } else {
                print('Neplatný příkaz. Zkus "push".');
            }
            break;
        case states.finished:
            print('🎉 Dobrodružství je hotové. Restartuj stránku pro nové dobrodružství.');
            break;
        default:
            print('Stav neznámý.');
    }
}

// Initial greeting
print('👋 Vítej v GitHub dobrodružství! Začni příkazem "instalovat".');

inputField.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const cmd = inputField.value;
        if (cmd) {
            print('> ' + cmd);
            handleCommand(cmd);
            inputField.value = '';
        }
    }
});
