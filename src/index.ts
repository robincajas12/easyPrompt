import {
  composePrompt,
  withRole,
  withContext,
  extract,
  withOutputFormat,
  asSummarization,
  withLength,
  withTone
} from './composer';

function demonstrateNewFunctions() {
  console.log("--- Ejemplo 1: Extracción de Datos de un Texto ---");

  const textToAnalyze = "El evento WWDC de Apple será el 10 de junio de 2024. Tim Cook presentará el nuevo iOS 18 en Cupertino. El evento se centrará en la inteligencia artificial.";

  const extractionPrompt = composePrompt(
    withRole("un experto en extracción de datos estructurados"),
    withContext(textToAnalyze, "ARTÍCULO DE NOTICIAS"),
    extract(['nombre del evento', 'fecha del evento', 'persona principal', 'lugar del evento', 'tema principal']),
    withOutputFormat("un objeto JSON con las claves solicitadas. Las claves no deben tener espacios.")
  );

  console.log(extractionPrompt);
  console.log("\n" + "=".repeat(50) + "\n");

  console.log("--- Ejemplo 2: Resumen con Tono y Longitud ---");

  const summarizationPrompt = composePrompt(
    withRole("un redactor de boletines informativos"),
    withContext(textToAnalyze, "TEXTO ORIGINAL"),
    asSummarization("un solo párrafo"),
    withLength("alrededor de 50 palabras"),
    withTone("informativo pero emocionante")
  );

  console.log(summarizationPrompt);
}

demonstrateNewFunctions();