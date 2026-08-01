$ErrorActionPreference = 'Stop'
$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$overridesPath = Join-Path $baseDir 'i18n-overrides.json'
$outPath = Join-Path $baseDir 'i18n.js'

$overrides = Get-Content $overridesPath -Raw -Encoding UTF8 | ConvertFrom-Json

$languages = @(
    @{ id = 'en'; flag = [char]0xD83C + [char]0xDDEC + [char]0xD83C + [char]0xDDE7; name = 'English'; code = 'EN' },
    @{ id = 'tr'; flag = [char]0xD83C + [char]0xDDF9 + [char]0xD83C + [char]0xDDF7; name = 'TÃ¼rkÃ§e'; code = 'TR' },
    @{ id = 'ar'; flag = [char]0xD83C + [char]0xDDF8 + [char]0xD83C + [char]0xDDE6; name = 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©'; code = 'AR' },
    @{ id = 'de'; flag = [char]0xD83C + [char]0xDDE9 + [char]0xD83C + [char]0xDDEA; name = 'Deutsch'; code = 'DE' },
    @{ id = 'fr'; flag = [char]0xD83C + [char]0xDDEB + [char]0xD83C + [char]0xDDF7; name = 'FranÃ§ais'; code = 'FR' },
    @{ id = 'es'; flag = [char]0xD83C + [char]0xDDEA + [char]0xD83C + [char]0xDDF8; name = 'EspaÃ±ol'; code = 'ES' },
    @{ id = 'pt'; flag = [char]0xD83C + [char]0xDDF5 + [char]0xD83C + [char]0xDDF9; name = 'PortuguÃªs'; code = 'PT' },
    @{ id = 'ru'; flag = [char]0xD83C + [char]0xDDF7 + [char]0xD83C + [char]0xDDFA; name = 'Ð ÑƒÑÑÐºÐ¸Ð¹'; code = 'RU' },
    @{ id = 'ja'; flag = [char]0xD83C + [char]0xDDEF + [char]0xD83C + [char]0xDDF5; name = 'æ—¥æœ¬èªž'; code = 'JA' },
    @{ id = 'ko'; flag = [char]0xD83C + [char]0xDDF0 + [char]0xD83C + [char]0xDDF7; name = 'í•œêµ­ì–´'; code = 'KO' },
    @{ id = 'zh'; flag = [char]0xD83C + [char]0xDDE8 + [char]0xD83C + [char]0xDDF3; name = 'ä¸­æ–‡'; code = 'ZH' },
    @{ id = 'hi'; flag = [char]0xD83C + [char]0xDDEE + [char]0xD83C + [char]0xDDF3; name = 'à¤¹à¤¿à¤¨à¥à¤¦à¥€'; code = 'HI' },
    @{ id = 'ur'; flag = [char]0xD83C + [char]0xDDF5 + [char]0xD83C + [char]0xDDF0; name = 'Ø§Ø±Ø¯Ùˆ'; code = 'UR' },
    @{ id = 'id'; flag = [char]0xD83C + [char]0xDDEE + [char]0xD83C + [char]0xDDE9; name = 'Bahasa'; code = 'ID' },
    @{ id = 'pl'; flag = [char]0xD83C + [char]0xDDF5 + [char]0xD83C + [char]0xDDF1; name = 'Polski'; code = 'PL' },
    @{ id = 'nl'; flag = [char]0xD83C + [char]0xDDF3 + [char]0xD83C + [char]0xDDF1; name = 'Nederlands'; code = 'NL' },
    @{ id = 'it'; flag = [char]0xD83C + [char]0xDDEE + [char]0xD83C + [char]0xDDF9; name = 'Italiano'; code = 'IT' }
)

$en = @{
    'lang.header' = 'LANGUAGE'
    'nav.features' = 'FEATURES'
    'nav.demo' = 'DEMO'
    'nav.security' = 'SECURITY & UPDATES'
    'nav.faqs' = 'FAQS'
    'nav.whyus' = 'WHY US'
    'nav.blog' = 'BLOG'
    'nav.getCheats' = 'Get Cheats'
    'hero.tagline' = 'Elite Security Software'
    'hero.title' = 'Buy DOTA2 Cheats — ESP, Map Hack & Cloud DMA'
    'hero.desc' = 'Gain the edge in ranked with Hero ESP, full map hack, cooldown tracking, and Cloud DMA support. Built for Windows 10/11 with instant delivery and 24/7 support when patches drop.'
    'hero.viewFeatures' = 'View Features'
    'seo.title' = 'DOTA2 Cheats | Buy ESP, Map Hack & Cloud DMA Tools'
    'seo.description' = 'Buy premium DOTA2 cheats with Hero ESP, full map hack, cooldown tracker and Cloud DMA. Instant delivery from $35/month. Windows 10/11, 24/7 support.'
    'features.title' = 'Features'
    'features.f1' = 'Hero ESP with items and level'
    'features.f2' = 'Full map hack - Remove fog of war'
    'features.f3' = 'Ability cooldown tracker'
    'features.f4' = 'Creep spawn timers'
    'features.f5' = 'Rune spawn indicators'
    'features.f6' = 'Last hit prediction helper'
    'features.f7' = 'Auto-dodge skillshots'
    'features.f8' = 'Ward placement ESP'
    'features.f9' = 'Roshan timer'
    'features.f10' = 'Enemy inventory ESP'
    'features.f11' = 'Performance optimized'
    'features.f12' = '24/7 Support'
    'features.f13' = 'CLOUD-DMA OPTION'
    'features.f14' = 'AWS - option'
    'demo.title' = 'Feature Demonstration Video'
    'demo.screenshots' = 'Screenshots'
    'demo.screenshotsHint' = 'Every feature shown in action â€” click any image to view it larger.'
    'demo.caption1' = 'Low Poly Map Mode'
    'demo.caption2' = 'Meta Picker'
    'pricing.label' = 'Pricing'
    'pricing.title' = 'Choose Your Duration'
    'pricing.monthly' = 'Monthly'
    'pricing.lifetime' = 'Lifetime'
    'pricing.best' = 'Best'
    'pricing.monthlyDesc' = '31 days of access'
    'pricing.lifetimeDesc' = 'Unlimited access'
    'pricing.delivery' = 'delivery'
    'pricing.instant' = 'instant'
    'pricing.duration' = 'duration'
    'pricing.support' = 'support'
    'pricing.support247' = '24/7'
    'pricing.secure' = 'Secure Payment'
    'pricing.buyNow' = 'Buy Now'
    'whyus.title' = 'Why Choose Our Premium Access Packages?'
    'whyus.card1Title' = 'Active Safeguards'
    'whyus.card1Desc' = 'Continuous diagnostic sweeps and automated status flags keep our software updated and stable at all times.'
    'whyus.card2Title' = 'Instant Delivery'
    'whyus.card2Desc' = 'Receive your unique credentials immediately upon completion of your transaction. Zero manual wait times.'
    'whyus.card3Title' = '24/7 Support'
    'whyus.card3Desc' = 'Access our community forums and ticketing systems for technical assistance whenever you require guidance.'
    'security.title' = 'System Updates & Secure Proactive Framework'
    'security.desc1' = 'Maintaining access in a dynamic environment requires constant innovation. Our secure framework operates on a live deployment pipeline, allowing our engineers to push micro-updates directly to the client without requiring system reboots or manual re-installations. We perform active patch monitoring around the clock, keeping a step ahead of publisher update schedules.'
    'security.desc2' = 'By utilizing low-level, client-side hook protection, the software isolates itself from scanning routines, maintaining system stability and low latency. The interface functions quietly in user space, avoiding intrusive driver calls that compromise system integrity. While online environments are constantly evolving, our proactive development cycle ensures that your tools remain operational.'
    'requirements.title' = 'System Requirements'
    'requirements.r1' = 'HVCI ON'
    'requirements.r2' = 'CORE ISOLATION ON'
    'requirements.r3' = 'TPM ON'
    'requirements.r4' = 'SECURE BOOT ON'
    'requirements.r5' = 'Cloud DMA required for full functionality.'
    'faq.title' = 'FAQs'
    'faq.q1' = 'How do I get access after purchase?'
    'faq.a1' = 'Your credentials are delivered instantly after payment. Check your email or account dashboard for login details and setup instructions.'
    'faq.q2' = 'Does it work after DOTA2 updates?'
    'faq.a2' = 'Yes. Our team monitors patches around the clock and pushes micro-updates to keep the software compatible with the latest game version.'
    'faq.q3' = 'What do I need enabled on my PC?'
    'faq.a3' = 'HVCI, Core Isolation, TPM, and Secure Boot must be enabled. Cloud DMA is required for full functionality.'
    'faq.q4' = 'How do I get support?'
    'faq.a4' = 'Join our Discord server for 24/7 community support, or open a ticket through our support channels for direct assistance.'
    'faq.q5' = "What's the difference between Monthly and Lifetime?"
    'faq.a5' = 'Monthly gives you 31 days of access. Lifetime provides unlimited access with all future updates included at no extra cost.'
    'faq.q6' = 'What is Cloud DMA and why is it required?'
    'faq.a6' = 'Cloud DMA is a hardware-level memory access method that runs externally from your game. It enables full ESP, map hack, and advanced features with minimal system impact.'
    'faq.q7' = 'How do I install and set up the software?'
    'faq.a7' = 'After purchase, download the client from your dashboard, run the installer, and follow the step-by-step setup guide. Full instructions are included with your credentials.'
    'faq.q8' = 'Can I use my license on multiple PCs?'
    'faq.a8' = 'Each license is tied to one machine. Contact support if you need to transfer your license to a new PC due to hardware changes.'
    'faq.q9' = 'What payment methods do you accept?'
    'faq.a9' = 'We accept major credit cards, crypto, and other secure payment options through our checkout. All transactions are encrypted and processed instantly.'
    'faq.q10' = 'Will this affect my game performance?'
    'faq.a10' = 'No. The software is performance optimized and runs with low CPU and memory usage. Cloud DMA offloads processing externally so your in-game FPS stays stable.'
    'faq.q11' = 'Can I get a refund?'
    'faq.a11' = 'Due to the digital nature of the product, refunds are handled on a case-by-case basis. Contact support within 24 hours of purchase if you experience technical issues.'
    'faq.q12' = 'Which Windows version is supported?'
    'faq.a12' = 'Windows 10 and Windows 11 (64-bit) are fully supported. Make sure all system requirements including HVCI, TPM, and Secure Boot are enabled before installing.'
    'footer.copyright' = [char]0xA9 + ' 2026 DOTA2. All rights reserved. For gaming research and educational use only.'
    'footer.features' = 'Features'
    'footer.demo' = 'Demo'
    'footer.security' = 'Security'
    'footer.whyus' = 'Why Us'
    'blog.title' = 'Blog'
    'blog.intro' = 'Notes from ranked queues, patch day rants, and the stuff nobody puts in a feature list.'
    'blog.getProduct' = 'Get Product'
    'footer.blog' = 'Blog'
    'footer.faqs' = 'FAQs'
    'footer.pricing' = 'Pricing'
}

function Merge-Hashtable($base, $overrideObj) {
    $merged = @{}
    foreach ($key in $base.Keys) { $merged[$key] = $base[$key] }
    if ($overrideObj) {
        foreach ($prop in $overrideObj.PSObject.Properties) {
            $merged[$prop.Name] = $prop.Value
        }
    }
    return $merged
}

$translations = @{ en = $en }
foreach ($lang in $languages) {
    if ($lang.id -eq 'en') { continue }
    $overrideObj = $overrides.$($lang.id)
    $translations[$lang.id] = Merge-Hashtable $en $overrideObj
}

$outputObj = @{
    languages = $languages
    translations = $translations
}

$json = $outputObj | ConvertTo-Json -Depth 10 -Compress:$false
$content = "window.SITE_I18N = $json;"
[System.IO.File]::WriteAllText($outPath, $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "Generated $outPath"
