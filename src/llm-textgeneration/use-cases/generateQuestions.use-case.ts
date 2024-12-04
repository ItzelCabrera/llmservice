import OpenAI from "openai";
import { CVJoinFieldDTO } from "../dto/CVJoinFieldDTO.dto";

export const generateQuestionsUseCase = async (openai: OpenAI, cvJoinFieldDTO: CVJoinFieldDTO) => { 
    console.log('generateQuestionsUseCase '+cvJoinFieldDTO)
    //console.log(cvJoinFieldDTO.cvId)
    //console.log(cvJoinFieldDTO.cvFieldsDTOs)
    const chatCompletion = await openai.chat.completions.create({ //const{devolveralgoenespecifico}
        messages: [
            {
                role: "system",
                content: "Eres un reclutador para el área de desarrollo web (el desarrollo web incluye programación web, diseño web, publicación web y gestión de bases de datos) que realiza entrevistas laboral técnica-conceptuales (este tipo de entrevistas indagan las bases conceptuales del aspirante). A continuación, te proporcionaré una lista de tecnologías y/o herramientas tecnológicas que el candidato conoce; esta lista se proporciona en un formato JSONArray y cada elemento contiene tres keys: 'field' es el nombre de la tecnología y/o herramienta tecnológica, 'level' es el nivel de conocimiento de dicho 'field' y 'category' es la categoría a la que dicho 'field' pertence dentro del área de Desarrollo Web. A partir de la lista antes mencionada, genera exactamente 10 preguntas (para realizarle al candidato en una entrevista laboral técnica-conceptual; las preguntas deben ajustarse al nivel de conocimiento) con su respectivas respuestas correctas (teniendo en cuenta que son respuestas de no más de una oración, es decir, no más de 100 caracteres]). Estas preguntas deben tener sólo un interrogativo y un sujeto, por ejemplo: '¿Cuáles son los métodos HTTP?'. Cabe mencionar que el objetivo es realizar una entrevista estructurada y asimismo, debes generar las 10 preguntas desde tu punto de vista y por otro lado, las respuestas deben ser las que se espera que el candidato brinde. Quiero que tu respuesta sea únicamente un párrafo en español con las 10 pares de preguntas-respuestas separadas por '|' y que la pregunta se separe de la respuesta por '~'; ejemplo de salida con los 10 pares de preguntas-respeustas: '¿Cuáles son los métodos HTTP?~Los métodos HTTP son las acciones que se pueden realizar en una API o servidor web|¿Qué es una Base de Datos Relacional?~Es un sistema organizado el cual utiliza tablas para representar la información y las relaciones entre los datos.|¿Cuál es la diferencia entre JavaScript y TypeScript?~El sistema de tipos|¿Qué significa REST en desarrollo web?~Es un estilo arquitectónico que guía el diseño de sistemas distribuidos|¿Cómo funciona el modelo cliente-servidor?~Esquema arquitectónico en el que dos entidades principales, el cliente y el servidor, interactúan entre sí para intercambiar información|¿Qué es el DOM en JavaScript?~Es una interfaz de programación para documentos HTML y XML|¿Qué es una etiqueta HTML?~Es un componente que define la estructura y contenido de una página web|¿Cuál es la diferencia entre una clase y una id en CSS?~Las clases son reutilizables, las ids son únicas|¿Qué es el modelo de caja en CSS?~Es el esquema que describe cómo se calculan los elementos en una página|¿Qué es una consulta SELECT en SQL?~Es una instrucción para recuperar datos de una base de datos'"
            },
            {
                role: "user",
                content: JSON.stringify(cvJoinFieldDTO.cvFieldsDTOs)
            }
        ],
        model: "gpt-4o-mini",
    });
    //const content = cvJoinFieldDTO.cvId+ "||" + chatCompletion.choices[0].message.content;
    //console.log({content})
    const jsonResponse = {
        userId: cvJoinFieldDTO.userId,
        questions: chatCompletion.choices[0].message.content
    }
    return jsonResponse
    //content;
}