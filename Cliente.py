import imaplib
import socket
import string

ClientSocket = socket.socket()
host = 'validator-tb.ydns.eu'
port = 10001
print('Waiting for connection')
try:
    ClientSocket.connect((host, port))
except socket.error as e:
    print(str(e))


def limpiarFROM(val):
    val = val[6:]
    val = str(val)
    datito = val.split("<")
    if len(datito) > 1:
        FROMM = datito[1]
    else:
        FROMM = datito
    FROMM = str(FROMM).replace(">", "").replace("[", "").replace("]", "")
    FROMM = FROMM.replace("\r", "").replace("\n", "").replace("\t", "").replace("\"", "").replace("\'", "")
    FROMM = FROMM.replace("\\r", "").replace("\\n", "")
    return FROMM


def limpiarMSGID(val):
    val = val.translate({ord(c): None for c in string.whitespace})
    val = val[12:]
    MSGID = str(val).rstrip(">")
    return MSGID


def limpiarAUTH(val):
    val = val[24:]
    AUTHRESULT = str(val).replace("\r", "").replace("\n", "").replace("\t", "").replace("\"", "").replace("\'", "")
    return AUTHRESULT


print(
    "Confirmar que tenga habilitado imap \" https://support.google.com/mail/answer/7126229?hl=es#zippy=%2Cstep-check-that-imap-is-turned-on \" ")
print(
    "Confirmar que tenga habilitado el acceso desde aplicaciones no seguras \" https://support.google.com/accounts/answer/6010255?hl=es#zippy=%2Cif-less-secure-app-access-is-on-for-your-account \" ")
print("El correo y la contraseñas no son almacenadas en ningun lado, tanto de manera local como online")
correo = input("Ingresar Correo Electronico: ")
clave = input("Ingresar Contraseña: ")
host = 'imap.gmail.com'
imap = imaplib.IMAP4_SSL(host)
imap.login(correo, clave)
imap.select('Inbox')
typ, data = imap.search(None, 'ALL')
print("Enviando Informacion")
for num in data[0].split():
    typ, data = imap.fetch(num, '(BODY[HEADER.FIELDS (MESSAGE-ID)])')
    MSGID = limpiarMSGID(data[0][1].decode())
    typ, data = imap.fetch(num, '(BODY[HEADER.FIELDS (FROM)])')
    data = str(data[0][1].decode())
    FROMM = limpiarFROM(data)
    typ, data = imap.fetch(num, '(BODY[HEADER.FIELDS (Authentication-Results)])')
    AUTHRESULT = limpiarAUTH(data[0][1].decode())
    typ, data = imap.fetch(num, '(BODY[HEADER.FIELDS (RECEIVED)])')
    datito = data[0][1].decode()
    datito = datito.split("Received:")
    if len(datito) > 3:
        primerReceived = str(datito[len(datito) - 1])
        penultimoReceived = str(datito[2])
        primerReceived = primerReceived[1:].replace("\n", "").replace("\r", "").replace("\"", "").replace("\\n",
                                                                                                          "").replace(
            "\\r", "")
        penultimoReceived = penultimoReceived[1:].replace("\n", "").replace("\r", "").replace("\"", "").replace("\\n",
                                                                                                                "").replace(
            "\\r", "")
        separador = " ##### "
        mensaje = "1" + separador + FROMM + separador + primerReceived + separador + penultimoReceived + separador + MSGID + separador + AUTHRESULT
        ClientSocket.send(mensaje.encode())
    elif len(datito) == 3:
        primerReceived = str(datito[len(datito) - 1])
        primerReceived = primerReceived[1:].replace("\n", "").replace("\r", "").replace("\"", "").replace("\\n",
                                                                                                          "").replace(
            "\\r", "")
        separador = " ##### "
        mensaje = "2" + separador + FROMM + separador + primerReceived + separador + MSGID + separador + AUTHRESULT
        ClientSocket.send(mensaje.encode())
ClientSocket.send(b'byebye')
ClientSocket.close()
print("Se termino de enviar la informacion")
imap.close()