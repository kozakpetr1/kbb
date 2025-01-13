TOR (The Onion Router) je anonymizační síť, která umožňuje uživatelům skrytě procházet internet, chránit svou identitu a obcházet cenzuru. Princip fungování TOR je založen na směrování dat přes více vrstev šifrovaných serverů (tzv. relays). Klíčové vlastnosti a principy TOR zahrnují:

### 1. **Šifrování ve vrstvách (Onion Routing)**

- Při použití TOR se data rozdělí na šifrované vrstvy, podobné vrstevnaté cibuli, odkud síť získala svůj název.
- Každý relay (uzel) dešifruje pouze jednu vrstvu šifrování, odhalí další relay, ke kterému má data poslat, a předá šifrovaný balíček dál.

### 2. **Třívrstvý přenosový okruh**

- Každé spojení v TOR prochází přes **tři náhodně vybrané relays**:
    1. **Vstupní uzel (Entry Node)**: Ví, kdo jste (IP adresa uživatele), ale nezná obsah ani cílovou adresu.
    2. **Střední uzel (Middle Node)**: Slouží jako prostředník a neví nic o zdroji nebo cíli dat.
    3. **Výstupní uzel (Exit Node)**: Rozšifruje poslední vrstvu a posílá data na cílový server. Tento uzel zná cílovou adresu, ale ne zdroj.

### 3. **Anonymita uživatele**

- Díky náhodnému směrování a šifrování v jednotlivých uzlech nemůže žádný jediný uzel zjistit celý řetězec komunikace.
- Uživatelská IP adresa je skrytá a nahrazena adresou výstupního uzlu.

### 4. **Distribuovaná síť**

- TOR je decentralizovaná síť složená z tisíců dobrovolníků, kteří poskytují své servery jako relays. To znamená, že neexistuje centrální bod, který by mohl snadno kompromitovat anonymitu.

### 5. **Skryté služby**

- Kromě přístupu na běžný internet umožňuje TOR přístup k tzv. **skrytým službám**, které mají adresy končící na `.onion`. Tyto služby jsou dostupné pouze přes síť TOR a poskytují ještě vyšší úroveň anonymity.

### Výhody:

- Chrání uživatele před sledováním a cenzurou.
- Zajišťuje anonymní komunikaci.
- Umožňuje přístup k blokovaným webovým stránkám.

### Nevýhody:

- Nižší rychlost přenosu dat kvůli vícevrstvému směrování.
- Možnost zneužití k nelegálním aktivitám.

---
### **Nastavení a používání sítě TOR – krok za krokem**

TOR se obvykle používá prostřednictvím aplikace **TOR Browser**, který je předkonfigurovaný pro snadné použití. Níže uvádím podrobnosti pro různé scénáře a technické nastavení:

---

### **1. Použití TOR Browser**

Nejjednodušší způsob, jak začít používat TOR.

1. **Stažení a instalace**:
    
    - Navštivte oficiální stránku: [https://www.torproject.org](https://www.torproject.org/).
    - Stáhněte si verzi pro váš operační systém (Windows, macOS, Linux, Android).
    - Nainstalujte aplikaci a spusťte ji.
2. **Připojení k síti TOR**:
    
    - Po spuštění vás aplikace vyzve, abyste se připojili k síti TOR.
    - Klikněte na **Connect**.
    - Pokud se nacházíte v zemi s cenzurou (např. Čína), zvolte možnost **Configure** a nastavte tzv. „bridge“ relays (viz níže).
3. **Procházení internetu**:
    
    - Po připojení k síti TOR můžete anonymně procházet internet pomocí TOR Browseru.
    - Předvolené vyhledávače (např. DuckDuckGo) respektují vaše soukromí.
4. **Test anonymního připojení**:
    
    - Ověřte, zda používáte TOR, návštěvou stránky [https://check.torproject.org](https://check.torproject.org/).

---

### **2. Pokročilé nastavení: Mosty (Bridges)**

Pro země nebo sítě, kde je přístup k síti TOR blokován.

1. **Zapnutí mostů (Bridges)**:
    
    - V **TOR Browseru** přejděte do nastavení: **Settings > Connection > Use a Bridge**.
    - Můžete použít automaticky zvolený most nebo zadat vlastní.
2. **Získání mostů**:
    
    - Navštivte stránku: [https://bridges.torproject.org](https://bridges.torproject.org/).
    - Požádejte o mosty přes prohlížeč nebo email.
3. **Manuální konfigurace**:
    
    - Zadejte IP adresu a port mostu do nastavení **TOR Browseru**.

---

### **3. TOR přes Linux (manuální konfigurace)**

Pokud chcete používat TOR mimo prohlížeč, například s jinými aplikacemi.

1. **Instalace balíčků**:
    
    - Na Debian/Ubuntu:
        
        ```bash
        sudo apt update
        sudo apt install tor
        ```
        
    - Na Fedora:
        
        ```bash
        sudo dnf install tor
        ```
        
2. **Spuštění služby**:
    
    ```bash
    sudo systemctl start tor
    ```
    
    - Služba běží na lokálním portu 9050 jako SOCKS proxy.
3. **Konfigurace aplikací**:
    
    - Nastavte aplikace tak, aby používaly SOCKS proxy:
        - Proxy: `127.0.0.1`
        - Port: `9050`.
4. **Test připojení**:
    
    - Ověřte funkčnost příkazem:
        
        ```bash
        curl --socks5-hostname 127.0.0.1:9050 https://check.torproject.org
        ```
        

---

### **4. Integrace TOR s dalšími aplikacemi**

Můžete směrovat síťový provoz vybraných aplikací přes TOR.

- **Přesměrování provozu přes proxy**:
    
    - Pomocí aplikace, která podporuje SOCKS5 proxy (např. Firefox, Telegram, SSH).
    - V aplikaci nastavte proxy server na `127.0.0.1:9050`.
- **Použití s Pythonem (requests knihovna)**:
    
    ```python
    import requests
    
    proxies = {
        'http': 'socks5h://127.0.0.1:9050',
        'https': 'socks5h://127.0.0.1:9050',
    }
    
    response = requests.get('https://check.torproject.org', proxies=proxies)
    print(response.text)
    ```
    

---

### **5. TOR pro Android (Orbot a Onion Browser)**

1. **Orbot**:
    
    - Stáhněte aplikaci Orbot z [Google Play](https://play.google.com/) nebo [F-Droid](https://f-droid.org/).
    - Spusťte Orbot a připojte se k síti TOR.
    - Nastavte aplikace v telefonu, aby používaly Orbot jako proxy.
2. **Onion Browser**:
    
    - Alternativa pro iOS (k dispozici v App Store).

---

### **6. Bezpečnostní tipy při používání TOR**

1. **Nepoužívejte osobní účty**:
    
    - Nepřihlašujte se na služby, které by mohly odhalit vaši identitu.
2. **Vždy používejte HTTPS**:
    
    - Výstupní uzly TOR nejsou šifrované, pokud není použito HTTPS.
3. **Neotvírejte dokumenty offline**:
    
    - Dokumenty (např. PDF) mohou obsahovat odkazy, které odhalí vaši skutečnou IP adresu.
4. **Vyhněte se instalaci doplňků do TOR Browseru**:
    
    - Mohou narušit anonymitu.
5. **Vyčistěte cookies a cache**:
    
    - Po každé relaci zavřete TOR Browser, který automaticky smaže data.

