// Karakter untuk tiap kategori
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?/~`';

const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const includeLowercase = document.getElementById('includeLowercase');
const includeUppercase = document.getElementById('includeUppercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const generateBtn = document.getElementById('generateBtn');
const passwordOutput = document.getElementById('passwordOutput');
const copyBtn = document.getElementById('copyBtn');

// Update tampilan nilai slider saat digeser
lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

// Fungsi untuk memilih karakter acak dari string
function getRandomChar(str) {
    const index = Math.floor(Math.random() * str.length);
    return str[index];
}

// Fungsi generate password
function generatePassword() {
    const length = parseInt(lengthSlider.value, 10);

    // Kumpulkan kategori yang dipilih
    const categories = [];
    if (includeLowercase.checked) categories.push(lowercase);
    if (includeUppercase.checked) categories.push(uppercase);
    if (includeNumbers.checked) categories.push(numbers);
    if (includeSymbols.checked) categories.push(symbols);

    if (categories.length === 0) {
        alert('Pilih setidaknya satu kategori karakter!');
        return;
    }

    // Gabungkan semua karakter yang dipilih
    const allChars = categories.join('');

    // Array untuk menampung karakter password
    const passwordChars = [];

    // Pastikan setidaknya satu karakter dari tiap kategori
    categories.forEach(category => {
        passwordChars.push(getRandomChar(category));
    });

    // Tambahkan karakter acak dari gabungan sampai panjang tercapai
    for (let i = passwordChars.length; i < length; i++) {
        passwordChars.push(getRandomChar(allChars));
    }

    // Acak posisi karakter agar karakter kategori yang dipastikan tidak selalu di awal
    for (let i = passwordChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
    }

    // Tampilkan password
    passwordOutput.value = passwordChars.join('');
}

// Fungsi menyalin password ke clipboard
function copyPassword() {
    const password = passwordOutput.value.trim();
    if (!password) {
        alert('Silakan klik Tombol Generate Password terlebih dahulu!.');
        return;
    }

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(password).then(() => {
            alert('Password berhasil disalin ke clipboard!');
        }, () => {
            alert('Gagal menyalin password.');
        });
    } else {
        passwordOutput.select();
        try {
            const success = document.execCommand('copy');
            if (success) {
                alert('Password berhasil disalin ke clipboard!');
            } else {
                alert('Gagal menyalin password.');
            }
        } catch {
            alert('Browser Anda tidak mendukung fitur salin otomatis.');
        }
        window.getSelection().removeAllRanges();
    }
}

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);

// Saat halaman dimuat, kosongkan textarea password
window.addEventListener('load', () => {
    passwordOutput.value = '';
    lengthValue.textContent = lengthSlider.value;
});

// Mencegah copy, cut, paste di seluruh dokumen
document.addEventListener('copy', e => e.preventDefault());
document.addEventListener('cut', e => e.preventDefault());
document.addEventListener('paste', e => e.preventDefault());

// Mencegah copy, cut, paste khusus pada textarea passwordOutput
passwordOutput.addEventListener('copy', e => e.preventDefault());
passwordOutput.addEventListener('cut', e => e.preventDefault());
passwordOutput.addEventListener('paste', e => e.preventDefault());