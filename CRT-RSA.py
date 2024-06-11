from flask import Flask, request, jsonify
import random
import binascii
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Functions from the provided code
def prime_generate(n):
    while True:
        prime_candidate = getLowLevelPrime(n)
        if not isMillerRabinPassed(prime_candidate):
            continue
        else:
            return prime_candidate

first_primes_list = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
                     31, 37, 41, 43, 47, 53, 59, 61, 67, 
                     71, 73, 79, 83, 89, 97, 101, 103, 
                     107, 109, 113, 127, 131, 137, 139, 
                     149, 151, 157, 163, 167, 173, 179, 
                     181, 191, 193, 197, 199, 211, 223, 
                     227, 229, 233, 239, 241, 251, 257, 
                     263, 269, 271, 277, 281, 283, 293, 
                     307, 311, 313, 317, 331, 337, 347, 349]

def nBitRandom(n):
    return random.randrange(2**(n-1)+1, 2**n - 1)

def getLowLevelPrime(n):
    while True:
        pc = nBitRandom(n)
        for divisor in first_primes_list:
            if pc % divisor == 0 and divisor ** 2 <= pc:
                break
        else:
            return pc

def isMillerRabinPassed(mrc):
    maxDivisionByTwo = 0
    ec = mrc - 1
    while ec % 2 == 0:
        ec >>= 1
        maxDivisionByTwo += 1
    assert(2 ** maxDivisionByTwo * ec == mrc - 1)
    
    def trialComposite(round_tester):
        if pow(round_tester, ec, mrc) == 1:
            return False
        for i in range(maxDivisionByTwo):
            if pow(round_tester, 2**i * ec, mrc) == mrc - 1:
                return False
        return True

    numberOfRabinTrials = 20
    for i in range(numberOfRabinTrials):
        round_tester = random.randrange(2, mrc)
        if trialComposite(round_tester):
            return False
    return True

def mod_ex(b, k, m):
    i = 1
    j = 0
    while j <= k:
        b = (b * i) % m
        i = b
        j += 1
    return b

def PowMod(b, e, m):
    bin_e = bin(e)
    bin_e = bin_e[::-1]
    ln = len(bin_e)
    result = 1
    for i in range(ln - 2):
        if bin_e[i] == '1':
            result *= mod_ex(b, i, m)
    return result % m

def eea(a, b):
    if a % b == 0:
        return b, 0, 1
    else:
        gcd, s, t = eea(b, a % b)
        s = s - (a // b) * t
        return gcd, t, s

def InvertModulo(e, phi):
    gcd, s, _ = eea(e, phi)
    if gcd != 1:
        return None
    else:
        return s % phi

def crt_rsa(c, da, db, p, q):
    # Calculate intermediate results using smaller exponents and moduli
    res1 = PowMod(c, da, p)
    res2 = PowMod(c, db, q)

    # Combine the results using the Chinese Remainder Theorem (CRT)
    q_inv = InvertModulo(q, p)
    h = (q_inv * (res1 - res2)) % p
    m = res2 + h * q
    return m

def ConvertToStr(integer_value):
    hex_from_int = hex(integer_value)[2:]
    if len(hex_from_int) % 2 != 0:
        hex_from_int = '0' + hex_from_int
    byte_value = binascii.unhexlify(hex_from_int)
    return byte_value.decode('utf-8', errors='backslashreplace')

def ConvertToInt(message):
    hex_from_byte = binascii.hexlify(message.encode('utf-8')).decode('utf-8')
    return int(hex_from_byte, 16)

def crt_decrypt(ciphertext, da, db, p, q):
    msg_str = base64.b64decode(ciphertext).decode('utf-8')
    s = msg_str
    m = ""
    while "|" in s:
        s1, s = map(str.strip, s.split("|", 1))
        b = int(s1)
        m += ConvertToStr(crt_rsa(b, da, db, p, q))
    return m

def encrypt(message, e, modulo):
    cytxt = ""
    per_char = 50
    s = message
    for i in range(0, len(message), per_char):
        s1 = s[:per_char]
        b = ConvertToInt(s1)
        cytxt1 = str(PowMod(b, e, modulo))
        cytxt = cytxt + cytxt1 + "|"
        s = s[per_char:]
    return base64.b64encode(cytxt.encode('utf-8'))

# Flask routes
@app.route('/generate_keys', methods=['GET'])
def generate_keys():
    n_bits = 512
    p = prime_generate(n_bits)
    q = prime_generate(n_bits)
    print ("p: ", p ,"q: ",q)
    n = p * q
    phi_n = (p - 1) * (q - 1)
    e = 65537  # Commonly used prime exponent
    d = InvertModulo(e, phi_n)
    # Calculate da and db
    da = d % (p - 1)
    db = d % (q - 1)

    print("Public key (e, n):", e, n)
    print("Private key (d, n):", d, n)
    return jsonify({
        'public_key': {'e': str(e), 'n': str(n)},
        'private_key': {'da': str(da), 'db': str(db), 'p': str(p), 'q': str(q)}
    })

@app.route('/encrypt', methods=['POST'])
def encrypt_message():
    data = request.json
    print("Received data:", data)  # Debug print
    message = data['message']
    e = 65537
    n = int(data['n'])
    encrypted_message = encrypt(message, e, n)
    print("Encrypted message:", encrypted_message)
    return jsonify({'encrypted_message': encrypted_message.decode('utf-8')})

@app.route('/decrypt', methods=['POST'])
def decrypt_message():
    data = request.json
    print("Received data:", data)  # Debug print
    encrypted_message = data['encrypted_message']
    encrypt_message = encrypted_message.encode('utf-8')
    da = int(data['da'])
    db = int(data['db'])
    p = int(data['p'])
    q = int(data['q'])
    print("Encrypted message:", encrypt_message)
    decrypted_message = crt_decrypt(encrypt_message,da,db,p, q)
    print("Decrypted message:", decrypted_message)
    return jsonify({'decrypted_message': decrypted_message})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
