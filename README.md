<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>GNSS Config v2.2 - Manu alias Buched</title>
    <style>
        :root { --primary: #3498db; --success: #27ae60; --danger: #e74c3c; --dark: #2c3e50; }
        body { font-family: 'Segoe UI', sans-serif; background: #F0F2F5; margin: 0; padding: 20px; display: flex; justify-content: center; }
        .container { background: white; width: 90%; max-width: 950px; padding: 25px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        h1 { text-align: center; color: var(--dark); margin-bottom: 20px; border-bottom: 2px solid var(--primary); padding-bottom: 10px; }
		h5 { text-align: center; }
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
        #btnSend { background: var(--success); color: white; border: none; cursor: pointer; font-weight: bold; font-size: 18px; height: 60px; margin-top: 20px; transition: 0.3s; width: 100%; }
        #btnSend:disabled { background: #ccc; cursor: not-allowed; }
        #console { background: #000; color: #00ff00; font-family: 'Consolas', monospace; height: 350px; margin-top: 10px; font-size: 11px; overflow-y: auto; padding: 10px; border-radius: 5px; white-space: pre-wrap; }
		.author-tag { text-align: center; font-size: 12px; color: #7f8c8d; margin-bottom: 20px; }
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
                    <option value="M20">Bynav M20(pas encore fait)</option>
                    <option value="M20D">Bynav M20D</option>
                </select>
            </div>
            <div>
                <label>Mode de fonctionnement :</label>
                <select id="opMode">
                    <option value="SINGLE">Single Antenna (Rover)</option>
                    <option value="DUAL">Dual Antenna (Heading)(pas encore fait)</option>
                </select>
            </div>
            <div>
                <label>Fréquence (Hz) :</label>
				<select id="hzRate" class="aog-default">
                    <option value="1">1 Hz</option>
                    <option value="5">5 Hz</option>
                    <option value="10" selected>10 Hz (AOG Default)</option>
                </select>
            </div>
        </div>
    </div>

    <div id="dualSection" class="section" style="display:none;">
        <div class="section-title">3. Offsets Antenne Dual (mètres)</div>
        <div class="grid">
            <div><label>Offset X :</label><input type="number" id="offsetX" value="0.000" step="0.01"></div>
            <div><label>Offset Y :</label><input type="number" id="offsetY" value="0.000" step="0.01"></div>
            <div><label>Offset Z :</label><input type="number" id="offsetZ" value="0.000" step="0.01"></div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">4. Sortie NMEA (Port COM2 du Witmotion)</div>
		<div class="nmea-grid">
            <div class="nmea-item aog-default"><input type="checkbox" class="nmea" value="GPGGA" checked> GGA (AOG Default)</div>
            <div class="nmea-item"><input type="checkbox" class="nmea" value="GPRMC"> RMC</div>
            <div class="nmea-item aog-default"><input type="checkbox" class="nmea" value="GPVTG" checked> VTG (AOG Default)</div>
            <div class="nmea-item"><input type="checkbox" class="nmea" value="GPGSA"> GSA</div>
            <div class="nmea-item"><input type="checkbox" class="nmea" value="GPGSV"> GSV</div>
            <div class="nmea-item" id="itemHeading"><input type="checkbox" class="nmea" value="GPHEADING"> HEADING</div>
            <div class="nmea-item" id="itemRoot"><input type="checkbox" class="nmea" value="GPROOT"> ROOT</div>
            <div class="nmea-item"><input type="checkbox" class="nmea" value="GPGST"> GST</div>
        </div>
    </div>

    <button id="btnSend" disabled>ENVOYER LA CONFIGURATION (Délai 5s)</button>

    <div id="console"></div>
</div>

<script>
    let port, writer, reader;
    const btnConnect = document.getElementById('btnConnect');
    const btnSend = document.getElementById('btnSend');
    const consoleDiv = document.getElementById('console');
    const gnssModel = document.getElementById('gnssModel');
    const opMode = document.getElementById('opMode');

    function updateUI() {
        const isDualSelected = opMode.value === "DUAL";
        const canDual = gnssModel.value === "UM982" || gnssModel.value === "M20D";
        document.getElementById('dualSection').style.display = (isDualSelected && canDual) ? 'block' : 'none';
        document.getElementById('itemHeading').style.opacity = isDualSelected ? "1" : "0.3";
        document.getElementById('itemRoot').style.opacity = isDualSelected ? "1" : "0.3";
    }

    gnssModel.addEventListener('change', updateUI);
    opMode.addEventListener('change', updateUI);

    btnConnect.addEventListener('click', async () => {
        if (port) { location.reload(); return; }
        try {
            port = await navigator.serial.requestPort();
            await port.open({ baudRate: parseInt(document.getElementById('baudRate').value) });
            btnConnect.textContent = "❌ DÉCONNECTER";
            btnConnect.classList.add('connected');
            btnSend.disabled = false;
            log("Connecté.");
            readLoop();
        } catch (err) { log("Erreur : " + err.message); }
    });

	async function readLoop() {
        while (port.readable) {
            // On crée un décodeur de texte suivi d'un transformateur de lignes
            const textDecoder = new TextDecoderStream();
            const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
            const reader = textDecoder.readable
                .pipeThrough(new TransformStream(new LineBreakTransformer()))
                .getReader();

            try {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    // Maintenant 'value' contient une ligne NMEA complète
                    log("RX: " + value.trim());
                }
            } catch (err) {
                log("Erreur de lecture : " + err.message);
            } finally {
                reader.releaseLock();
            }
        }
    }

    // Petit utilitaire pour reconstruire les lignes
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
        const mode = opMode.value;
        const hzVal = parseFloat(document.getElementById('hzRate').value);
        const interval = (1 / hzVal).toFixed(1);
        
        // Les lignes vides "" servent de pauses de 5s supplémentaires
        // Idéal après un FRESET pour laisser la puce redémarrer.
        let cmds = ["FRESET", "", "", ""]; 

        if (model.startsWith("UM")) {
            cmds.push("VERSIONA", "CONFIG ANTENNA POWERON", "", "CONFIG NMEAVERSION V411", "CONFIG RTK TIMEOUT 180", "CONFIG RTK RELIABILITY 4 3", "CONFIG PPP TIMEOUT 180", "CONFIG HEADING RELIABILITY 4", "CONFIG DGPS TIMEOUT 300", "CONFIG RTCMB1CB2A DISABLE", "CONFIG HEADING LENGTH 150.00 3.00", "CONFIG PPS ENABLE GPS POSITIVE 500000 1000 0 0");
            if (mode === "DUAL" && model === "UM982")
				{
					const x = document.getElementById('offsetX').value;
					const y = document.getElementById('offsetY').value;
					const z = document.getElementById('offsetZ').value;
					cmds.push(`CONFIG ANTENNADELTAHEN OFFSET ${x} ${y} ${z}`);
					cmds.push("MODE ROVER SURVEY", "CONFIG HEADING TRACTOR");
				}
			else
				{
					cmds.push("MODE ROVER UAV");
				}
			if (model === "UM980")
				{
					cmds.push("CONFIG SIGNALGROUP 2");
				}
			else if(model === "UM982")
				{
					cmds.push("CONFIG SIGNALGROUP 3 6");
				}
            cmds.push("CONFIG AGNSS DISABLE", "UNMASK GPS", "MASK BDS", "UNMASK GLO", "UNMASK GAL", "MASK QZSS", "CONFIG COM2 460800");
        } else {
            // Logique Bynav
            if (model === "M20D") {
                cmds.push("RTKTYPE ROVER", "DUALANTENNAPOWER OFF", "WORKFREQS B1IB2IB3IB1CB2AB2BL1L1CL2CL5G1G2E1E5BE5AE6I5", "SNRCUTOFF 15", "RTKTIMEOUT 180", "SET OBSFREQ 10", "ASSIGNALL BEIDOU IDLE", "ASSIGNALL GPS AUTO", "ASSIGNALL GLONASS AUTO", "ASSIGNALL GALILEO AUTO", "ASSIGNALL QZSS IDLE", "ASSIGNALL IRNSS IDLE", "INTERFACEMODE COM2 AUTO AUTO ON");
            }
            if (mode === "DUAL" && model === "M20D") {
                const x = document.getElementById('offsetX').value;
                const y = document.getElementById('offsetY').value;
                const z = document.getElementById('offsetZ').value;
                cmds.push(`SET ANTENNAOFFSET ${x} ${y} ${z}`);
            }
            if (model.startsWith("M20")) {
                cmds.push("SERIALCONFIG COM2 460800");
            }
        }

        // Ajout des messages NMEA
        document.querySelectorAll('.nmea:checked').forEach(cb => {
            if (mode === "SINGLE" && (cb.value === "GPHEADING" || cb.value === "GPROOT")) return;
            if (model.startsWith("UM")) {
                cmds.push(`${cb.value} COM2 ${interval}`);
            } else {
                cmds.push(`LOG COM2 ${cb.value} ONTIME ${interval}`);
            }
        });

        cmds.push("SAVECONFIG");
        if (model.startsWith("M20")) cmds.push("REBOOT", "", "LOG COM4 GPGGA ONTIME 1");

        // --- EXECUTION DE LA SEQUENCE ---
        btnSend.disabled = true;
        const encoder = new TextEncoder();
        writer = port.writable.getWriter();

        log(`--- Début Configuration : ${model} [${mode}] ---`);
        
        for (let i = 0; i < cmds.length; i++) {
            const cmd = cmds[i];
            btnSend.innerText = `Étape ${i+1}/${cmds.length}...`;

            if (cmd.trim() !== "") {
                log(">>> " + cmd);
                await writer.write(encoder.encode(cmd + "\r\n"));
            } else {
                log("... Pause de sécurité (reboot ou attente) ...");
            }

            // On attend TOUJOURS 5 secondes, même pour une commande vide ""
            await new Promise(r => setTimeout(r, 5000));
        }
        
        log("--- CONFIGURATION TERMINÉE AVEC SUCCÈS ---");
        btnSend.innerText = "🚀 ENVOYER LA CONFIGURATION";
        writer.releaseLock();
        btnSend.disabled = false;
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
