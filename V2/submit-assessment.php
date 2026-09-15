<?php
// Bear & Croc website -> Resend
// Keep RESEND_API_KEY in the server environment; never put it in this file or GitHub.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$length = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($length <= 0 || $length > 30000) {
    http_response_code(413);
    echo json_encode(['ok' => false, 'error' => 'Invalid request size']);
    exit;
}

$apiKey = getenv('RESEND_API_KEY');
if (!$apiKey) {
    error_log('Bear & Croc website: RESEND_API_KEY is not configured.');
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'Email service is not configured']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    exit;
}

function clean($value, $max = 200) {
    $value = trim((string)$value);
    $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value);
    return mb_substr($value, 0, $max);
}

$kind = clean($input['kind'] ?? 'assessment', 30);
$name = clean($input['name'] ?? '', 120);
$company = clean($input['company'] ?? '', 160);
$email = filter_var(trim((string)($input['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$phone = clean($input['phone'] ?? '', 80);

if (!$name || !$email) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Name and valid email are required']);
    exit;
}

if (!empty($input['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

if ($kind === 'contact') {
    $message = clean($input['message'] ?? '', 4000);
    if (!$message) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Message is required']);
        exit;
    }

    $fields = [
        'Name' => $name,
        'Email' => $email,
        'Company' => $company ?: '-',
        'Phone' => $phone ?: '-',
        'Message' => $message
    ];

    $subject = 'Website Contact — ' . ($company ?: $name);
    $tagValue = 'website-contact';
    $heading = 'Bear & Croc Website Contact';
} else {
    $profile = clean($input['profile'] ?? '', 100);
    $a = is_array($input['assessment'] ?? null) ? $input['assessment'] : [];
    $trouble = $a['trouble'] ?? [];
    if (!is_array($trouble)) $trouble = [];
    $trouble = array_slice(array_map(fn($v) => clean($v, 80), $trouble), 0, 12);

    $fields = [
        'Profile' => $profile,
        'Score' => clean($a['score'] ?? '', 20),
        'Name' => $name,
        'Email' => $email,
        'Company' => $company ?: '-',
        'Phone' => $phone ?: '-',
        'Furnaces / systems' => clean($a['furnaces'] ?? ''),
        'Overall condition' => clean($a['condition'] ?? ''),
        'Equipment age' => clean($a['age'] ?? ''),
        'Maintenance history' => clean($a['history'] ?? ''),
        'Production interruptions' => clean($a['downtime'] ?? ''),
        'Clarity of next move' => clean($a['nextmove'] ?? ''),
        'Outside vendors/resources' => clean($a['vendors'] ?? ''),
        'Trouble areas' => $trouble ? implode(', ', $trouble) : 'None selected',
        'Knowledge loss if key person left' => clean($a['knowledge'] ?? '')
    ];

    $subject = 'Equipment Health Check — ' . ($company ?: $name);
    $tagValue = 'equipment-health-check';
    $heading = 'Bear & Croc Equipment Health Check';
}

$text = $heading . "\n\n";
foreach ($fields as $label => $value) $text .= $label . ': ' . $value . "\n";
$text .= "\nSubmitted from bearandcroc.com";

$rows = '';
foreach ($fields as $label => $value) {
    $safeValue = nl2br(htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8'));
    $rows .= '<tr><td style="padding:8px 12px;border-bottom:1px solid #ddd;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#333;vertical-align:top;">' . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') . '</td><td style="padding:8px 12px;border-bottom:1px solid #ddd;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#333;vertical-align:top;">' . $safeValue . '</td></tr>';
}
$html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge"></head><body style="margin:0;background-color:#f1f0ec;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="padding:24px;"><table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;"><tr><td bgcolor="#222422" style="background-color:#222422;padding:22px;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:28px;font-weight:bold;color:#ffffff;">' . htmlspecialchars($heading, ENT_QUOTES, 'UTF-8') . '</td></tr><tr><td style="padding:18px;"><table width="100%" cellpadding="0" cellspacing="0" border="0">' . $rows . '</table></td></tr></table></td></tr></table></body></html>';

$payload = [
    'from' => 'Bear & Croc Website <website@bearandcroc.com>',
    'to' => ['sales@bearandcroc.com'],
    'reply_to' => [$email],
    'subject' => $subject,
    'text' => $text,
    'html' => $html,
    'tags' => [['name' => 'source', 'value' => $tagValue]]
];

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
]);
$response = curl_exec($ch);
$status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($response === false || $status < 200 || $status >= 300) {
    error_log('Bear & Croc Resend failure HTTP ' . $status . ': ' . ($error ?: $response));
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Email delivery failed']);
    exit;
}

echo json_encode(['ok' => true]);
