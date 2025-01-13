### **1. Princip fungování**

- **TOR**:
    
    - Data procházejí přes několik šifrovaných uzlů (relays) v decentralizované síti.
    - Každý uzel vidí jen část trasy, což zvyšuje anonymitu.
    - Používá **vícevrstvé šifrování**.
- **VPN (Virtual Private Network)**:
    
    - Vytváří šifrovaný tunel mezi zařízením uživatele a serverem VPN.
    - Veškerý internetový provoz je směrován přes server, který mění IP adresu uživatele.
    - Šifrování je obvykle **end-to-end** mezi uživatelem a VPN serverem.

---

### **2. Anonymita**

- **TOR**:
    
    - Vysoká úroveň anonymity díky náhodně zvoleným uzlům a šifrování.
    - Poskytovatel internetu (ISP) vidí, že používáte TOR, ale nevidí obsah ani cílovou adresu.
    - Nikdo (ani TOR síť) nemá kompletní informace o uživateli a cílovém serveru.
- **VPN**:
    
    - Nabízí anonymitu vůči ostatním uživatelům sítě a ISP, ale poskytovatel VPN může vidět celou vaši aktivitu (pokud nemá striktní zásady o logování).
    - Úroveň anonymity závisí na důvěryhodnosti VPN poskytovatele.

---

### **3. Rychlost**

- **TOR**:
    
    - Obvykle pomalejší kvůli směrování přes více uzlů a opakovanému šifrování.
    - Nevhodné pro stahování velkých souborů nebo streamování.
- **VPN**:
    
    - Rychlejší než TOR, ale záleží na kvalitě serverů VPN.
    - Vhodné pro streaming a jiné aktivity náročné na přenos dat.

---

### **4. Použití**

- **TOR**:
    
    - Anonymní prohlížení webu.
    - Přístup ke skrytým službám (`.onion`).
    - Bypass cenzury a ochrana před sledováním.
    - Nevhodné pro aktivity vyžadující vysokou rychlost.
- **VPN**:
    
    - Bezpečné připojení k veřejným Wi-Fi sítím.
    - Skrytí IP adresy a přístup k obsahu omezenému geografickými regiony.
    - Vhodné pro běžné procházení, práci i streaming.

---

### **5. Transparentnost**

- **TOR**:
    
    - Open-source projekt.
    - Komunita může kontrolovat kód a fungování.
- **VPN**:
    
    - Kvalita a transparentnost závisí na konkrétním poskytovateli. Některé služby logují data, jiné mají přísné zásady no-log.

---

### **6. Bezpečnost**

- **TOR**:
    
    - Vysoká bezpečnost díky distribuované povaze.
    - Výstupní uzly nejsou šifrované (citlivá data mohou být kompromitována, pokud nepoužíváte HTTPS).
- **VPN**:
    
    - Poskytuje šifrování po celé trase mezi uživatelem a VPN serverem.
    - Pokud VPN server není důvěryhodný, může data monitorovat.

---

### **7. Způsob instalace a použití**

- **TOR**:
    
    - Stáhnutí a použití TOR Browser nebo nastavení aplikací, které podporují TOR.
    - Snadné použití, ale méně přizpůsobitelné než VPN.
- **VPN**:
    
    - Vyžaduje registraci u poskytovatele, instalaci aplikace a připojení ke konkrétnímu serveru.
    - Mnohem širší možnosti konfigurace a funkcí (kill switch, split tunneling).

---

### **Shrnutí: Kdy použít?**

- **TOR**:
    
    - Chcete-li maximální anonymitu a přístup k cenzurovaným nebo skrytým službám.
    - Nevhodné pro aktivity náročné na rychlost.
- **VPN**:
    
    - Potřebujete vyšší rychlost a bezpečné připojení k internetu, ale anonymita vůči poskytovateli VPN není prioritou.
    - Vhodné pro každodenní použití a ochranu soukromí.