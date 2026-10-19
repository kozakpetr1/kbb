### **Co je VPN?**

VPN (Virtual Private Network) je technologie, která vytváří šifrovaný „tunel“ mezi vaším zařízením a serverem VPN. Tento tunel chrání vaše data před odposlechem a maskuje vaši IP adresu, což zajišťuje větší bezpečnost a anonymitu při používání internetu.

---

### **Princip fungování VPN**

VPN funguje na základě několika klíčových mechanismů:

---

#### **1. Šifrování dat**

- Při připojení k VPN je veškerý váš internetový provoz zašifrován.
- Šifrování zajišťuje, že data jsou čitelná pouze pro vás a server VPN, i když je někdo zachytí (např. na veřejné Wi-Fi síti).
- Používané šifrovací protokoly zahrnují:
    - **AES-256**: Vysoká úroveň šifrování, považována za velmi bezpečnou.
    - **ChaCha20**: Alternativa k AES, optimalizovaná pro mobilní zařízení.

---

#### **2. Tunelování**

- Tunelování znamená, že VPN obaluje (encapsuluje) vaše data do šifrovaných paketů a směruje je přes VPN server.
- Existují různé tunelovací protokoly, například:
    - **OpenVPN**: Otevřený standard, známý svou bezpečností a flexibilitou.
    - **WireGuard**: Moderní, rychlý a efektivní protokol.
    - **IKEv2/IPSec**: Rychlý a stabilní, oblíbený na mobilních zařízeních.

---

#### **3. Maskování IP adresy**

- Vaše zařízení při připojení k VPN serveru používá IP adresu tohoto serveru, nikoli svou vlastní.
- To znamená, že cílový server (např. webová stránka) nevidí vaši skutečnou IP adresu, ale pouze adresu VPN serveru.

---

#### **4. Přesměrování provozu**

- Veškerý váš internetový provoz je přesměrován přes VPN server.
- To má několik důsledků:
    - Skrytí vaší polohy (např. můžete se „připojit“ z jiné země).
    - Obcházení cenzury nebo geografických blokací.
    - Zvýšení ochrany při připojení na veřejné Wi-Fi sítě.

---

### **Jak VPN funguje v praxi?**

1. **Navázání spojení**:
    
    - Uživatel spustí VPN klienta (aplikaci) a připojí se k serveru VPN.
    - Klient a server si vymění šifrovací klíče pro zabezpečenou komunikaci.
2. **Zašifrování dat**:
    
    - Veškerý provoz z vašeho zařízení je zašifrován a odeslán přes VPN server.
    - VPN server rozšifruje data, odešle je na cílový server (např. webovou stránku), obdrží odpověď a znovu zašifruje odpověď, kterou pošle zpět.
3. **Maskování identity**:
    
    - Váš ISP (poskytovatel internetu) vidí pouze šifrovaný provoz mezi vámi a VPN serverem, nikoli jeho obsah ani cílové servery.

---

### **Hlavní výhody VPN**

1. **Bezpečnost**:
    
    - Chrání data před hackery, zejména na nezabezpečených sítích (např. veřejné Wi-Fi).
2. **Anonymita**:
    
    - Skryje vaši IP adresu a polohu, čímž chrání vaši identitu.
3. **Obcházení geografických blokací**:
    
    - Umožňuje přístup k obsahu omezenému na konkrétní země (např. streamovací služby).
4. **Ochrana před sledováním**:
    
    - ISP ani jiné třetí strany nemohou sledovat vaši internetovou aktivitu.

---

### **Hlavní nevýhody VPN**

1. **Závislost na poskytovateli VPN**:
    
    - Poskytovatel může vidět váš provoz. Vyberte takového, který má zásady „no-logs“ (neuchovává záznamy o aktivitě).
2. **Nižší rychlost**:
    
    - Přesměrování provozu přes server a šifrování mohou způsobit menší zpoždění.
3. **Blokace VPN**:
    
    - Některé služby (např. Netflix) aktivně blokují IP adresy spojené s VPN.

---

| **Poskytovatel**            | **Počet serverů** | **Počet zemí** | **Počet současných připojení** | **Cena za měsíc**                  | **Speciální funkce**                                 |
| --------------------------- | ----------------- | -------------- | ------------------------------ | ---------------------------------- | ---------------------------------------------------- |
| **NordVPN**                 | 6 800+            | 60+            | Až 6 zařízení                  | Od 3,49 USD/měsíc při 2letém plánu | Double VPN, CyberSec, NordLynx protokol              |
| **ExpressVPN**              | 2 000+            | 94             | Až 5 zařízení                  | Od 6,67 USD/měsíc při ročním plánu | Lightway protokol, TrustedServer technologie         |
| **Surfshark**               | 3 200+            | 100            | Neomezeně                      | Od 2,49 USD/měsíc při 2letém plánu | CleanWeb, MultiHop, Whitelister                      |
| **CyberGhost**              | 11 500+           | 91             | Až 7 zařízení                  | Od 2,19 USD/měsíc při 2letém plánu | Servery optimalizované pro streaming a torrentování  |
| **Private Internet Access** | 35 000+           | 84             | Až 10 zařízení                 | Od 2,03 USD/měsíc při 2letém plánu | MACE (blokování reklam a malwaru), podpora WireGuard |
