const express = require('express');
const app = express();
const axios = require('axios');
const { createBot, createProvider, MemoryDB, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const { BaileysProvider, handleCtx } = require('@bot-whatsapp/provider-baileys');

// Función para verificar si una fecha es la fecha de hoy (comparando solo el día)
const esFechaDeHoy = (fechaString) => {
    const fecha = new Date(fechaString);
    const fechaHoy = new Date();
    return fecha.toDateString() === fechaHoy.toDateString();
};

// Definir los flujos para las nuevas palabras clave y respuestas
const flowBienvenida = addKeyword(['kiki']).addAction(async (ctx, { flowDynamic }) => {
    return flowDynamic([`¡Hola! ¿En qué podemos ayudarte?
En breve serás atendido por un asesor.`]);
});



// Lógica principal
const main = async () => {
    const provider = createProvider(BaileysProvider);
    provider.initHttpServer(3002);

    provider.http.server.post('/send-message', handleCtx(async(bot, req, res)=>{
        try {
            const { phoneNumber, message } = req.body;
            if (!phoneNumber || !message) {
                throw new Error('Número de teléfono o mensaje no proporcionado');
            }
            await bot.sendMessage(phoneNumber, message, {});
            res.end('Mensaje enviado correctamente');
        } catch (error) {
            console.error('Error al enviar mensaje:', error.message);
            res.end('Error al enviar mensaje');
        }
    }))
    
    
    // Llamar a la función de consulta y envío de mensajes cada minuto
    setInterval(async () => {
        try {
            const datosFiltrados = await consultarDatos();
            await enviarMensajes(datosFiltrados, provider);
        } catch (error) {
            console.error('Error en la lógica principal:', error.message);
        }
    }, 3600000); // 60 minutos
//}, 5000); // 5 segundos


    // Inicializar el bot con todos los flujos, incluida la respuesta predeterminada y los comandos disponibles
    const bot = await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    });
};

// Llamar a la función principal
main();