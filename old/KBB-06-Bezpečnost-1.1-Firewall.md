Firewall je základní bezpečnostní prvek, který chrání síť nebo zařízení před neautorizovaným přístupem a šířením škodlivého kódu. Firewall sleduje a kontroluje síťový provoz na základě předdefinovaných pravidel, a to buď na úrovni softwaru nebo hardwaru. Existuje několik klíčových nástrojů a technik, které firewall využívá k zajištění bezpečnosti sítě. Následuje přehled těchto technik.

---

## 1. **Filtrování paketů (Packet Filtering)**
- **Popis**: Filtrování paketů je základní technika, kdy firewall kontroluje každý síťový paket, který prochází mezi různými částmi sítě. Firewall na základě předem stanovených pravidel rozhoduje, zda paket povolit nebo zablokovat.
- **Pravidla**: 
  - **IP adresa**: Povolí nebo blokuje připojení z určité IP adresy.
  - **Port**: Ovládá přístup na konkrétní síťové porty (např. HTTP port 80, HTTPS port 443).
  - **Protokol**: Může filtrovat specifické protokoly, jako jsou TCP, UDP, ICMP apod.
  
**Výhody**:
- Jednoduchost a rychlost.
- Efektivní pro základní síťovou kontrolu.

---

## 2. **Stavové filtrování (Stateful Inspection)**
- **Popis**: Stavové filtrování je pokročilejší technika, která sleduje stav každé síťové spojení. Na rozdíl od základního filtrování paketů, které kontroluje každý paket izolovaně, stavový firewall udržuje tabulky, které sledují jednotlivé spojení a související pakety. 
- **Pravidla**: Firewall udržuje stavovou tabulku, která obsahuje informace o probíhajících spojeních, což mu umožňuje lépe rozpoznat legitimní a nelegitimní provoz.
- **Techniky**:
  - **Sledování spojení**: Firewall sleduje sekvenci paketů mezi odesílatelem a příjemcem.
  - **Kontrola sesionních dat**: Udržuje kontrolu nad tokem dat, což znamená, že pro každý paket, který je součástí otevřeného spojení, je vyhodnocován nejen obsah, ale i historie.

**Výhody**:
- Vyšší bezpečnost ve srovnání s filtrováním paketů.
- Možnost detekce neobvyklých nebo podezřelých aktivit.

---

## 3. **Proxy (Proxy Firewall)**
- **Popis**: Proxy firewall funguje jako zprostředkovatel mezi interní sítí a vnějším světem. Všechny požadavky z vnější sítě jsou nejprve přesměrovány na proxy server, který provádí kontrolu a rozhoduje, zda je požadavek oprávněný.
- **Techniky**:
  - **Změna IP adresy**: Proxy může maskovat IP adresu zařízení v interní síti.
  - **Ověřování aplikací**: Proxy firewall může kontrolovat specifické aplikace (např. HTTP nebo FTP) a filtrovat obsah.
  
**Výhody**:
- Zvyšuje úroveň ochrany tím, že se ukrývá za proxy server.
- Vhodné pro kontrolu specifických aplikací a protokolů.

---

## 4. **Detekce a prevence průniků (IDS/IPS)**
- **Popis**: IDS (Intrusion Detection System) a IPS (Intrusion Prevention System) jsou nástroje, které detekují a reagují na podezřelou aktivitu v síti.
- **Techniky**:
  - **IDS**: Systém monitoruje síťový provoz a vyhledává vzory známé útoky. Jakmile detekuje hrozbu, pouze upozorní administrátora.
  - **IPS**: Na rozdíl od IDS IPS nejen detekuje, ale také blokuje podezřelý provoz v reálném čase.
  
**Výhody**:
- IDS/IPS umožňují včasnou detekci a blokování útoků.
- IPS poskytuje proaktivní ochranu proti škodlivým aktivitám.

---

## 5. **Filtrace URL a DNS (URL Filtering & DNS Filtering)**
- **Popis**: Filtrace URL a DNS slouží k blokování přístupu na škodlivé webové stránky nebo domény.
- **Techniky**:
  - **Filtrace URL**: Firewall může blokovat přístup na konkrétní URL adresy na základě seznamu nebezpečných webů nebo obsahového filtrování.
  - **Filtrace DNS**: Firewall může blokovat dotazy na nebezpečné domény nebo přesměrovat DNS dotazy na bezpečné servery.

**Výhody**:
- Ochrana před nebezpečnými webovými stránkami.
- Ochrana proti phishingu a jiným formám online podvodů.

---

## 6. **Kontrola aplikací (Application Layer Filtering)**
- **Popis**: Kontrola aplikací se zaměřuje na filtrování specifických aplikací a protokolů na aplikační vrstvě, jako je HTTP, FTP, SMTP nebo VoIP. Firewall kontroluje, zda požadavky odpovídají očekávaným vzorcům pro danou aplikaci.
- **Techniky**:
  - **Analýza paketů aplikace**: Firewall vyhodnocuje obsah specifických aplikací a rozhoduje, zda je komunikace oprávněná.
  - **Detekce chování aplikace**: U některých pokročilých firewallů lze analyzovat vzorce chování aplikace, což umožňuje identifikaci neobvyklých aktivit, které by mohly být znakem útoku.

**Výhody**:
- Schopnost chránit proti útokům, které využívají specifické aplikace.
- Vhodné pro detekci skrytých útoků na aplikační vrstvě.

---

## 7. **VPN (Virtual Private Network) podpora**
- **Popis**: Firewally mohou poskytovat šifrování pro virtuální privátní sítě (VPN) a ověřovat připojení mezi dvěma koncovými zařízeními (např. mezi pobočkou a centrální kanceláří).
- **Techniky**:
  - **Šifrování**: VPN šifruje data, aby zabránila jejich odposlechu.
  - **Ověřování připojení**: Firewall může ověřovat, zda je připojení k VPN bezpečné a zda používá správnou šifrovací technologii.

**Výhody**:
- Ochrana datových toků mezi vzdálenými uživateli a servery.
- Zabezpečení citlivých informací při práci na veřejných sítích.

---

## Závěr

Firewally využívají kombinaci těchto technik k zajištění bezpečnosti sítí a zařízení. Každá technika nabízí různé úrovně ochrany a detekce, které jsou vhodné pro různé typy organizací a síťových prostředí. Efektivní firewall by měl kombinovat několik těchto metod, aby zajistil komplexní ochranu před širokým spektrem kybernetických hrozeb.