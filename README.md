<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>GNSS Config v2.5 - Manu alias Buched</title>
    <style>
        :root { --primary: #3498db; --success: #27ae60; --danger: #e74c3c; --dark: #2c3e50; --aog: #2ecc71; }
        body { font-family: 'Segoe UI', sans-serif; background: #F0F2F5; margin: 0; padding: 20px; display: flex; justify-content: center; }
        .container { background: white; width: 100%; max-width: 950px; padding: 25px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        h1 { text-align: center; color: var(--dark); margin-bottom: 5px; border-bottom: 2px solid var(--primary); padding-bottom: 10px; }
        .author-tag { text-align: center; font-size: 12px; color: #7f8c8d; margin-bottom: 20px; }
        .section { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: #fafafa; }
        .section-title { font-weight: bold; margin-bottom: 12px; color: var(--primary); text-transform: uppercase; border-left: 4px solid var(--primary); padding-left: 10px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 10px; }
        label { display: block; margin-bottom: 5px; font-weight: 600; font-size: 13px; }
        select, button, input { width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box; }
        .aog-default { background-color: #e8f8f1 !important; border: 2px solid var(--aog) !important; font-weight: bold; }
        .nmea-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; background: white; padding: 10px; border-radius: 5px; border: 1px solid #eee; }
        .nmea-item { display: flex; align-items: center; font-size: 13px; }
        .nmea-item input { width: auto; margin-right: 8px; }
        #btnConnect { background: var(--primary); color: white; border: none; cursor: pointer; font-weight: bold; height: 45px; }
        #btnConnect.connected { background: var(--danger); }
        #btnSend { background: var(--success); color: white; border: none; cursor: pointer; font-weight: bold; font-size: 18px; height: 60px; margin-top: 20px; width: 100%; }
        #btnSend:disabled { background: #ccc; cursor: not-allowed; }
        #btnClear { background: #7f8c8d; color: white; margin-top: 10px; height: 35px; border: none; cursor: pointer; font-size: 12px; font-weight: bold; border-radius: 5px; }
        #console { background: #000; color: #00ff00; font-family: 'Consolas', monospace; height: 350px; margin-top: 10px; font-size: 11px; overflow-y: auto; padding: 10px; border-radius: 5px; white-space: pre-wrap; }
        #fileInputSection { background: #eef2f7; border: 2px dashed #3498db; }
    </style>
</head>
<body>

<div class="container">
    <h1>CONFIGURATEUR GNSS pour AOG</h1>
    <div class="author-tag">Développé par Buched - Licence CC BY 4.0</div>

    <div class="section">
        <div class="section-title">1. Connexion Série</div>
        <div class="grid">
            <div style="grid-column: span 2;"><button id="btnConnect">CONNECTER LE RÉCEPTEUR</button></div>
            <div>
                <select id="baudRate">
					<option value="9600">9600</option>
					<option value="38400">38400</option>
					<option value="57600">57600</option>
                    <option value="115200" selected>115200 (Défaut)</option>
                    <option value="460800">460800</option>
                    <option value="921600">921600</option>
                </select>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">2. Matériel & Mode</div>
        <div class="grid">
            <div>
                <label>Modèle de carte :</label>
                <select id="gnssModel">
                    <option value="UM980">Unicore UM980</option>
                    <option value="UM982">Unicore UM982</option>
                    <option value="M20D">Bynav M20D</option>
                    <option value="CUSTOM">--- CUSTOM (Fichier .txt/.conf) ---</option>
                </select>
            </div>
            <div id="standardOptions1">
                <label>Mode de fonctionnement :</label>
                <select id="opMode">
                    <option value="SINGLE">Single Antenna (Rover)</option>
                    <option value="DUAL">Dual Antenna (Heading)</option>
                </select>
            </div>
            <div id="standardOptions2">
                <label>Fréquence (Hz) :</label>
                <select id="hzRate" class="aog-default">
                    <option value="1">1 Hz</option>
                    <option value="5">5 Hz</option>
                    <option value="10" selected>10 Hz (AOG Default)</option>
                </select>
            </div>
        </div>
    </div>

    <div id="fileInputSection" class="section" style="display:none;">
        <div class="section-title" style="color:#2c3e50; border-left-color:#2c3e50;">📥 Sélectionner le fichier de configuration</div>
        <input type="file" id="fileSelector" accept=".txt,.conf">
        <p style="font-size: 11px; color: #666; margin-top: 5px;">Le fichier sera envoyé ligne par ligne avec un délai de 5s entre chaque commande.</p>
    </div>

    <div id="dualSection" class="section" style="display:none;">
        <div class="section-title">3. Offsets Antenne Dual (mètres)</div>
        <div class="grid">
            <div><label>Offset X :</label><input type="number" id="offsetX" value="0.000" step="0.01"></div>
            <div><label>Offset Y :</label><input type="number" id="offsetY" value="0.000" step="0.01"></div>
            <div><label>Offset Z :</label><input type="number" id="offsetZ" value="0.000" step="0.01"></div>
        </div>
    </div>

    <div id="nmeaSection" class="section">
        <div class="section-title">4. Sortie NMEA (Port COM2)</div>
        <div class="nmea-grid">
            <div class="nmea-item aog-default"><input type="checkbox" class="nmea" value="GPGGA" checked> GGA</div>
            <div class="nmea-item"><input type="checkbox" class="nmea" value="GPRMC"> RMC</div>
            <div class="nmea-item aog-default"><input type="checkbox" class="nmea" value="GPVTG" checked> VTG</div>
            <div class="nmea-item"><input type="checkbox" class="nmea" value="GPGSA"> GSA</div>
            <div class="nmea-item"><input type="checkbox" class="nmea" value="GPGSV"> GSV</div>
            <div class="nmea-item" id="itemHeading"><input type="checkbox" class="nmea" value="GPHEADING"> HEADING</div>
            <div class="nmea-item" id="itemRoot"><input type="checkbox" class="nmea" value="GPROOT"> ROOT</div>
            <div class="nmea-item"><input type="checkbox" class="nmea" value="GPGST"> GST</div>
        </div>
    </div>

    <button id="btnSend" disabled>ENVOYER LA CONFIGURATION</button>
    <button id="btnClear">🗑️ VIDER LA CONSOLE</button>

    <div id="console"></div>
</div>

<script>
    let port, writer, reader, isReading = false;
    let customCommands = [];

    const btnConnect = document.getElementById('btnConnect');
    const btnSend = document.getElementById('btnSend');
    const btnClear = document.getElementById('btnClear');
    const consoleDiv = document.getElementById('console');
    const gnssModel = document.getElementById('gnssModel');
    const opMode = document.getElementById('opMode');
    const fileSelector = document.getElementById('fileSelector');

    function updateUI() {
        const isCustom = gnssModel.value === "CUSTOM";
        const isDual = opMode.value === "DUAL";

        // Affichage dynamique
        document.getElementById('fileInputSection').style.display = isCustom ? 'block' : 'none';
        document.getElementById('standardOptions1').style.visibility = isCustom ? 'hidden' : 'visible';
        document.getElementById('standardOptions2').style.visibility = isCustom ? 'hidden' : 'visible';
        document.getElementById('nmeaSection').style.display = isCustom ? 'none' : 'block';
        
        document.getElementById('dualSection').style.display = (!isCustom && isDual) ? 'block' : 'none';
        document.getElementById('itemHeading').style.opacity = isDual ? "1" : "0.3";
        document.getElementById('itemRoot').style.opacity = isDual ? "1" : "0.3";
    }

    gnssModel.addEventListener('change', updateUI);
    opMode.addEventListener('change', updateUI);

    // Lecture du fichier Custom
    fileSelector.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const readerObj = new FileReader();
        readerObj.onload = (e) => {
            const content = e.target.result;
            // On sépare par ligne et on nettoie (vides et commentaires)
            customCommands = content.split(/\r?\n/).filter(line => line.trim().length > 0 && !line.startsWith('#'));
            log(`Fichier chargé : ${customCommands.length} commandes trouvées.`);
        };
        readerObj.readAsText(file);
    });

    btnClear.addEventListener('click', () => {
        consoleDiv.innerText = "";
        log("Console vidée.");
    });

    btnConnect.addEventListener('click', async () => {
        if (port) { 
            try {
                isReading = false;
                if (reader) await reader.cancel();
                if (writer) { writer.releaseLock(); writer = null; }
                await port.close();
                port = null;
                log("Déconnecté.");
            } catch (err) { port = null; }
            btnConnect.textContent = "CONNECTER LE RÉCEPTEUR";
            btnConnect.classList.remove('connected');
            btnSend.disabled = true;
            return; 
        }
        try {
            port = await navigator.serial.requestPort();
            await port.open({ baudRate: parseInt(document.getElementById('baudRate').value) });
            btnConnect.textContent = "❌ DÉCONNECTER";
            btnConnect.classList.add('connected');
            btnSend.disabled = false;
            log("Connecté.");
            isReading = true;
            readLoop();
        } catch (err) { log("Erreur : " + err.message); }
    });

    async function readLoop() {
        while (port && port.readable && isReading) {
            try {
                const textDecoder = new TextDecoderStream();
                port.readable.pipeTo(textDecoder.writable);
                reader = textDecoder.readable.pipeThrough(new TransformStream(new LineBreakTransformer())).getReader();
                while (isReading) {
                    const { value, done } = await reader.read();
                    if (done || !isReading) break;
                    log("RX: " + value.trim());
                }
            } catch (err) { break; } finally { if (reader) reader.releaseLock(); }
        }
    }

    class LineBreakTransformer {
        constructor() { this.container = ''; }
        transform(chunk, controller) {
            this.container += chunk;
            const lines = this.container.split('\r\n');
            this.container = lines.pop();
            lines.forEach(line => controller.enqueue(line));
        }
        flush(controller) { controller.enqueue(this.container); }
    }

    btnSend.addEventListener('click', async () => {
        const model = gnssModel.value;
        let cmds = [];

        if (model === "CUSTOM") {
            if (customCommands.length === 0) { alert("Sélectionnez d'abord un fichier !"); return; }
            cmds = [...customCommands];
        } else {
            // Logique standard (Unicore/Bynav)
            const mode = opMode.value;
            const hzVal = parseFloat(document.getElementById('hzRate').value);
            const interval = (1 / hzVal).toFixed(1);
            
            if (model.startsWith("UM") || model.startsWith("M20")) cmds.push("FRESET", "", "", "");
			
        if (model.startsWith("UM")) {
            cmds.push("VERSIONA", "CONFIG ANTENNA POWERON", "", "CONFIG NMEAVERSION V411", "CONFIG RTK TIMEOUT 180", "CONFIG RTK RELIABILITY 4 3", "CONFIG PPP TIMEOUT 180", "CONFIG HEADING RELIABILITY 4", "CONFIG DGPS TIMEOUT 300", "CONFIG RTCMB1CB2A DISABLE", "CONFIG HEADING LENGTH 150.00 3.00", "CONFIG PPS ENABLE GPS POSITIVE 500000 1000 0 0");
            if (mode === "DUAL" && model === "UM982") {
                const x = document.getElementById('offsetX').value;
                const y = document.getElementById('offsetY').value;
                const z = document.getElementById('offsetZ').value;
                cmds.push(`CONFIG ANTENNADELTAHEN OFFSET ${x} ${y} ${z}`, "MODE ROVER SURVEY", "CONFIG HEADING TRACTOR");
            } else { cmds.push("MODE ROVER UAV"); }
            if (model === "UM980") cmds.push("CONFIG SIGNALGROUP 2");
            else if(model === "UM982") cmds.push("CONFIG SIGNALGROUP 3 6");
            cmds.push("CONFIG AGNSS DISABLE", "UNMASK GPS", "MASK BDS", "UNMASK GLO", "UNMASK GAL", "MASK QZSS", "CONFIG COM2 460800");
        } else if (model.startsWith("M20")) {
            if (model === "M20D") cmds.push("RTKTYPE ROVER", "DUALANTENNAPOWER OFF", "WORKFREQS B1IB2IB3IB1CB2AB2BL1L1CL2CL5G1G2E1E5BE5AE6I5", "SNRCUTOFF 15", "RTKTIMEOUT 180", "SET OBSFREQ 10", "ASSIGNALL BEIDOU IDLE", "ASSIGNALL GPS AUTO", "ASSIGNALL GLONASS AUTO", "ASSIGNALL GALILEO AUTO", "ASSIGNALL QZSS IDLE", "ASSIGNALL IRNSS IDLE", "INTERFACEMODE COM2 AUTO AUTO ON");
            if (mode === "DUAL" && model === "M20D") {
                const x = document.getElementById('offsetX').value;
                const y = document.getElementById('offsetY').value;
                const z = document.getElementById('offsetZ').value;
                cmds.push(`SET ANTENNAOFFSET ${x} ${y} ${z}`);
            }
            cmds.push("SERIALCONFIG COM2 460800");
        }


        document.querySelectorAll('.nmea:checked').forEach(cb => {
            if (mode === "SINGLE" && (cb.value === "GPHEADING" || cb.value === "GPROOT")) return;
            if (model.startsWith("UM")) {
                cmds.push(`${cb.value} COM2 ${interval}`, "SAVECONFIG");
            } else if(model.startsWith("M20")) {
                cmds.push(`LOG COM2 ${cb.value} ONTIME ${interval}`, "SAVECONFIG");
            }
        });

        if (model.startsWith("M20")) cmds.push("REBOOT", "", "LOG COM4 GPGGA ONTIME 1");
        }

        btnSend.disabled = true;
        const encoder = new TextEncoder();
        writer = port.writable.getWriter();
        log(`--- Injection : ${model} (${cmds.length} lignes) ---`);
        
        for (let i = 0; i < cmds.length; i++) {
            const cmd = cmds[i];
            btnSend.innerText = `Étape ${i+1}/${cmds.length}...`;
            if (cmd.trim() !== "") {
                log(">>> " + cmd);
                await writer.write(encoder.encode(cmd + "\r\n"));
            }
            await new Promise(r => setTimeout(r, 5000));
        }
        
        log("--- TERMINÉ ---");
        writer.releaseLock();
        btnSend.disabled = false;
        btnSend.innerText = "🚀 ENVOYER LA CONFIGURATION";
    });

    function log(msg) {
        const time = new Date().toLocaleTimeString();
        consoleDiv.innerText += `[${time}] ${msg}\n`;
        consoleDiv.scrollTop = consoleDiv.scrollHeight;
    }
    updateUI();
</script>
</body>
</html>
