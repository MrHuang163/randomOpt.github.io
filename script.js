document.addEventListener('DOMContentLoaded', function() {
    let attackersData = null;
    let defendersData = null;
    let selectedFaction = null;
    
    // 加载进攻方数据
    fetch('attackers.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            attackersData = parser.parseFromString(xmlString, "text/xml");
        })
        .catch(error => console.error('Error loading attackers data:', error));
    
    // 加载防守方数据
    fetch('defenders.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            defendersData = parser.parseFromString(xmlString, "text/xml");
        })
        .catch(error => console.error('Error loading defenders data:', error));
    
    // 阵营选择按钮
    const attackerBtn = document.getElementById('attackerBtn');
    const defenderBtn = document.getElementById('defenderBtn');
    const randomBtn = document.getElementById('randomBtn');
    
    attackerBtn.addEventListener('click', function() {
        selectedFaction = 'attacker';
        updateButtonStyles();
        if (attackersData) generateRandomLoadout(attackersData);
    });
    
    defenderBtn.addEventListener('click', function() {
        selectedFaction = 'defender';
        updateButtonStyles();
        if (defendersData) generateRandomLoadout(defendersData);
    });
    
    randomBtn.addEventListener('click', function() {
        selectedFaction = Math.random() < 0.5 ? 'attacker' : 'defender';
        updateButtonStyles();
        const data = selectedFaction === 'attacker' ? attackersData : defendersData;
        if (data) generateRandomLoadout(data);
    });
    
    function updateButtonStyles() {
        // 重置所有按钮样式
        attackerBtn.classList.remove('selected');
        defenderBtn.classList.remove('selected');
        randomBtn.classList.remove('selected');
        
        // 为当前选择的按钮添加样式
        if (selectedFaction === 'attacker') {
            attackerBtn.classList.add('selected');
        } else if (selectedFaction === 'defender') {
            defenderBtn.classList.add('selected');
        } else {
            randomBtn.classList.add('selected');
        }
    }
    
    function generateRandomLoadout(xmlDoc) {
        const faction = xmlDoc.documentElement.getAttribute('faction');
        const operators = xmlDoc.getElementsByTagName("operator");
        
        if (operators.length === 0) {
            console.error('No operators found in the selected faction');
            return;
        }
        
        // 随机选择干员和装备
        const randomOperatorIndex = Math.floor(Math.random() * operators.length);
        const selectedOperator = operators[randomOperatorIndex];
        const operatorName = selectedOperator.getAttribute('name');
        
        const weapons = selectedOperator.getElementsByTagName("weapon");
        const randomWeaponIndex = Math.floor(Math.random() * weapons.length);
        const selectedWeapon = weapons[randomWeaponIndex];
        const weaponName = selectedWeapon.getAttribute('name');
        
        const grips = selectedWeapon.getElementsByTagName("grip");
        const randomGripIndex = Math.floor(Math.random() * grips.length);
        const gripName = grips[randomGripIndex].getAttribute('name');
        
        const muzzles = selectedWeapon.getElementsByTagName("muzzle");
        const randomMuzzleIndex = Math.floor(Math.random() * muzzles.length);
        const muzzleName = muzzles[randomMuzzleIndex].getAttribute('name');
        
        const quasiMirrors = selectedWeapon.getElementsByTagName("Quasi-mirror");
        const randomQuasiMirrorIndex = Math.floor(Math.random() * quasiMirrors.length);
        const quasiMirrorName = quasiMirrors[randomQuasiMirrorIndex].getAttribute('name');
        
        // 显示结果
        const operatorIndicator = document.getElementById('operator');
        operatorIndicator.className = 'faction-indicator ' + faction + '-indicator';
        document.getElementById('operatorName').textContent = operatorName;
        document.getElementById('weapon').textContent = weaponName;
        document.getElementById('grip').textContent = gripName;
        document.getElementById('muzzle').textContent = muzzleName;
        document.getElementById('quasiMirror').textContent = quasiMirrorName;
        
        document.getElementById('result').style.display = 'block';
    }
    
    // 初始选择进攻方
    selectedFaction = 'attacker';
    updateButtonStyles();
});
