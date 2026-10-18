import { Sequence, useVideoConfig } from "remotion";
import { BasicCaptions } from "./BasicCaptions";
export const Teste02Captions = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      <Sequence name="Legenda hook" durationInFrames={90} premountFor={fps}>
        <div className="teste02-captions">
          <BasicCaptions
            name="Fala"
            premountFor={fps}
            width={840}
            combineTokensWithinMilliseconds={1350}
            style={{ position: "absolute", left: 100, top: 1460 }}
            captions={[
              {
                text: "Ainda",
                startMs: 200.0,
                endMs: 575.0,
                timestampMs: 387.5,
                confidence: null,
              },
              {
                text: " copia",
                startMs: 587.5,
                endMs: 987.5,
                timestampMs: 787.5,
                confidence: null,
              },
              {
                text: " e",
                startMs: 1000.0,
                endMs: 1050.0,
                timestampMs: 1025.0,
                confidence: null,
              },
              {
                text: " cola",
                startMs: 1062.5,
                endMs: 1375.0,
                timestampMs: 1218.75,
                confidence: null,
              },
              {
                text: " pedidos?",
                startMs: 1387.5,
                endMs: 2000.0,
                timestampMs: 1693.75,
                confidence: null,
              },
            ]}
          />
        </div>
      </Sequence>
      <Sequence
        name="Legenda problem"
        from={90}
        durationInFrames={252}
        premountFor={fps}
      >
        <div className="teste02-captions">
          <BasicCaptions
            name="Fala"
            premountFor={fps}
            width={840}
            combineTokensWithinMilliseconds={1350}
            style={{ position: "absolute", left: 100, top: 1460 }}
            captions={[
              {
                text: "Chega",
                startMs: 200.0,
                endMs: 550.0,
                timestampMs: 375.0,
                confidence: null,
              },
              {
                text: " um",
                startMs: 562.5,
                endMs: 662.5,
                timestampMs: 612.5,
                confidence: null,
              },
              {
                text: " e-mail.",
                startMs: 675.0,
                endMs: 1112.5,
                timestampMs: 893.75,
                confidence: null,
              },
              {
                text: " Você",
                startMs: 1975.0,
                endMs: 2337.5,
                timestampMs: 2156.25,
                confidence: null,
              },
              {
                text: " lê,",
                startMs: 2350.0,
                endMs: 2637.5,
                timestampMs: 2493.75,
                confidence: null,
              },
              {
                text: " copia",
                startMs: 2800.0,
                endMs: 3175.0,
                timestampMs: 2987.5,
                confidence: null,
              },
              {
                text: " dados,",
                startMs: 3187.5,
                endMs: 3650.0,
                timestampMs: 3418.75,
                confidence: null,
              },
              {
                text: " abre",
                startMs: 3875.0,
                endMs: 4125.0,
                timestampMs: 4000.0,
                confidence: null,
              },
              {
                text: " a",
                startMs: 4137.5,
                endMs: 4175.0,
                timestampMs: 4156.25,
                confidence: null,
              },
              {
                text: " planilha",
                startMs: 4187.5,
                endMs: 4700.0,
                timestampMs: 4443.75,
                confidence: null,
              },
              {
                text: " e",
                startMs: 4712.5,
                endMs: 4750.0,
                timestampMs: 4731.25,
                confidence: null,
              },
              {
                text: " escreve",
                startMs: 4762.5,
                endMs: 5200.0,
                timestampMs: 4981.25,
                confidence: null,
              },
              {
                text: " a",
                startMs: 5212.5,
                endMs: 5275.0,
                timestampMs: 5243.75,
                confidence: null,
              },
              {
                text: " mesma",
                startMs: 5287.5,
                endMs: 5687.5,
                timestampMs: 5487.5,
                confidence: null,
              },
              {
                text: " resposta.",
                startMs: 5700.0,
                endMs: 6337.5,
                timestampMs: 6018.75,
                confidence: null,
              },
              {
                text: " Tudo",
                startMs: 7200.0,
                endMs: 7450.0,
                timestampMs: 7325.0,
                confidence: null,
              },
              {
                text: " de",
                startMs: 7462.5,
                endMs: 7562.5,
                timestampMs: 7512.5,
                confidence: null,
              },
              {
                text: " novo.",
                startMs: 7575.0,
                endMs: 7937.5,
                timestampMs: 7756.25,
                confidence: null,
              },
            ]}
          />
        </div>
      </Sequence>
      <Sequence
        name="Legenda solution"
        from={342}
        durationInFrames={245}
        premountFor={fps}
      >
        <div className="teste02-captions">
          <BasicCaptions
            name="Fala"
            premountFor={fps}
            width={840}
            combineTokensWithinMilliseconds={1350}
            style={{ position: "absolute", left: 100, top: 1460 }}
            captions={[
              {
                text: "A",
                startMs: 200.0,
                endMs: 312.5,
                timestampMs: 256.25,
                confidence: null,
              },
              {
                text: " saída",
                startMs: 325.0,
                endMs: 762.5,
                timestampMs: 543.75,
                confidence: null,
              },
              {
                text: " não",
                startMs: 775.0,
                endMs: 962.5,
                timestampMs: 868.75,
                confidence: null,
              },
              {
                text: " é",
                startMs: 975.0,
                endMs: 1025.0,
                timestampMs: 1000.0,
                confidence: null,
              },
              {
                text: " só",
                startMs: 1037.5,
                endMs: 1237.5,
                timestampMs: 1137.5,
                confidence: null,
              },
              {
                text: " conversar",
                startMs: 1250.0,
                endMs: 1837.5,
                timestampMs: 1543.75,
                confidence: null,
              },
              {
                text: " com",
                startMs: 1850.0,
                endMs: 2025.0,
                timestampMs: 1937.5,
                confidence: null,
              },
              {
                text: " um",
                startMs: 2037.5,
                endMs: 2112.5,
                timestampMs: 2075.0,
                confidence: null,
              },
              {
                text: " chatbot.",
                startMs: 2125.0,
                endMs: 2862.5,
                timestampMs: 2493.75,
                confidence: null,
              },
              {
                text: " É",
                startMs: 3725.0,
                endMs: 3850.0,
                timestampMs: 3787.5,
                confidence: null,
              },
              {
                text: " conectar",
                startMs: 3862.5,
                endMs: 4387.5,
                timestampMs: 4125.0,
                confidence: null,
              },
              {
                text: " as",
                startMs: 4400.0,
                endMs: 4437.5,
                timestampMs: 4418.75,
                confidence: null,
              },
              {
                text: " etapas,",
                startMs: 4450.0,
                endMs: 5062.5,
                timestampMs: 4756.25,
                confidence: null,
              },
              {
                text: " com",
                startMs: 5275.0,
                endMs: 5400.0,
                timestampMs: 5337.5,
                confidence: null,
              },
              {
                text: " IA",
                startMs: 5412.5,
                endMs: 6687.5,
                timestampMs: 6050.0,
                confidence: null,
              },
              {
                text: " e",
                startMs: 6700.0,
                endMs: 6737.5,
                timestampMs: 6718.75,
                confidence: null,
              },
              {
                text: " regras",
                startMs: 6750.0,
                endMs: 7150.0,
                timestampMs: 6950.0,
                confidence: null,
              },
              {
                text: " claras.",
                startMs: 7162.5,
                endMs: 7712.5,
                timestampMs: 7437.5,
                confidence: null,
              },
            ]}
          />
        </div>
      </Sequence>
      <Sequence
        name="Legenda extract"
        from={587}
        durationInFrames={210}
        premountFor={fps}
      >
        <div className="teste02-captions">
          <BasicCaptions
            name="Fala"
            premountFor={fps}
            width={840}
            combineTokensWithinMilliseconds={1350}
            style={{ position: "absolute", left: 100, top: 1460 }}
            captions={[
              {
                text: "Veja:",
                startMs: 200.0,
                endMs: 675.0,
                timestampMs: 437.5,
                confidence: null,
              },
              {
                text: " um",
                startMs: 925.0,
                endMs: 1087.5,
                timestampMs: 1006.25,
                confidence: null,
              },
              {
                text: " cliente",
                startMs: 1100.0,
                endMs: 1537.5,
                timestampMs: 1318.75,
                confidence: null,
              },
              {
                text: " pede",
                startMs: 1550.0,
                endMs: 1775.0,
                timestampMs: 1662.5,
                confidence: null,
              },
              {
                text: " uma",
                startMs: 1787.5,
                endMs: 1912.5,
                timestampMs: 1850.0,
                confidence: null,
              },
              {
                text: " proposta",
                startMs: 1925.0,
                endMs: 2475.0,
                timestampMs: 2200.0,
                confidence: null,
              },
              {
                text: " para",
                startMs: 2487.5,
                endMs: 2675.0,
                timestampMs: 2581.25,
                confidence: null,
              },
              {
                text: " sexta.",
                startMs: 2687.5,
                endMs: 3150.0,
                timestampMs: 2918.75,
                confidence: null,
              },
              {
                text: " O",
                startMs: 4012.5,
                endMs: 4125.0,
                timestampMs: 4068.75,
                confidence: null,
              },
              {
                text: " fluxo",
                startMs: 4137.5,
                endMs: 4575.0,
                timestampMs: 4356.25,
                confidence: null,
              },
              {
                text: " identifica",
                startMs: 4587.5,
                endMs: 5150.0,
                timestampMs: 4868.75,
                confidence: null,
              },
              {
                text: " o",
                startMs: 5162.5,
                endMs: 5212.5,
                timestampMs: 5187.5,
                confidence: null,
              },
              {
                text: " assunto",
                startMs: 5225.0,
                endMs: 5650.0,
                timestampMs: 5437.5,
                confidence: null,
              },
              {
                text: " e",
                startMs: 5662.5,
                endMs: 5700.0,
                timestampMs: 5681.25,
                confidence: null,
              },
              {
                text: " o",
                startMs: 5712.5,
                endMs: 5775.0,
                timestampMs: 5743.75,
                confidence: null,
              },
              {
                text: " prazo.",
                startMs: 5787.5,
                endMs: 6187.5,
                timestampMs: 5987.5,
                confidence: null,
              },
            ]}
          />
        </div>
      </Sequence>
      <Sequence
        name="Legenda execute"
        from={797}
        durationInFrames={300}
        premountFor={fps}
      >
        <div className="teste02-captions">
          <BasicCaptions
            name="Fala"
            premountFor={fps}
            width={840}
            combineTokensWithinMilliseconds={1350}
            style={{ position: "absolute", left: 100, top: 1460 }}
            captions={[
              {
                text: "Os",
                startMs: 200.0,
                endMs: 375.0,
                timestampMs: 287.5,
                confidence: null,
              },
              {
                text: " dados",
                startMs: 387.5,
                endMs: 825.0,
                timestampMs: 606.25,
                confidence: null,
              },
              {
                text: " viram",
                startMs: 837.5,
                endMs: 1150.0,
                timestampMs: 993.75,
                confidence: null,
              },
              {
                text: " uma",
                startMs: 1162.5,
                endMs: 1325.0,
                timestampMs: 1243.75,
                confidence: null,
              },
              {
                text: " tarefa.",
                startMs: 1337.5,
                endMs: 1850.0,
                timestampMs: 1593.75,
                confidence: null,
              },
              {
                text: " Depois,",
                startMs: 2712.5,
                endMs: 3325.0,
                timestampMs: 3018.75,
                confidence: null,
              },
              {
                text: " a",
                startMs: 3450.0,
                endMs: 3512.5,
                timestampMs: 3481.25,
                confidence: null,
              },
              {
                text: " IA",
                startMs: 3525.0,
                endMs: 4800.0,
                timestampMs: 4162.5,
                confidence: null,
              },
              {
                text: " prepara",
                startMs: 4812.5,
                endMs: 5100.0,
                timestampMs: 4956.25,
                confidence: null,
              },
              {
                text: " uma",
                startMs: 5112.5,
                endMs: 5237.5,
                timestampMs: 5175.0,
                confidence: null,
              },
              {
                text: " resposta",
                startMs: 5250.0,
                endMs: 5825.0,
                timestampMs: 5537.5,
                confidence: null,
              },
              {
                text: " com",
                startMs: 5837.5,
                endMs: 5975.0,
                timestampMs: 5906.25,
                confidence: null,
              },
              {
                text: " as",
                startMs: 5987.5,
                endMs: 6025.0,
                timestampMs: 6006.25,
                confidence: null,
              },
              {
                text: " informações",
                startMs: 6037.5,
                endMs: 6800.0,
                timestampMs: 6418.75,
                confidence: null,
              },
              {
                text: " que",
                startMs: 6812.5,
                endMs: 6900.0,
                timestampMs: 6856.25,
                confidence: null,
              },
              {
                text: " você",
                startMs: 6912.5,
                endMs: 7162.5,
                timestampMs: 7037.5,
                confidence: null,
              },
              {
                text: " forneceu.",
                startMs: 7175.0,
                endMs: 7812.5,
                timestampMs: 7493.75,
                confidence: null,
              },
            ]}
          />
        </div>
      </Sequence>
      <Sequence
        name="Legenda review"
        from={1097}
        durationInFrames={334}
        premountFor={fps}
      >
        <div className="teste02-captions">
          <BasicCaptions
            name="Fala"
            premountFor={fps}
            width={840}
            combineTokensWithinMilliseconds={1350}
            style={{ position: "absolute", left: 100, top: 1460 }}
            captions={[
              {
                text: "Agora,",
                startMs: 200.0,
                endMs: 700.0,
                timestampMs: 450.0,
                confidence: null,
              },
              {
                text: " a",
                startMs: 937.5,
                endMs: 1037.5,
                timestampMs: 987.5,
                confidence: null,
              },
              {
                text: " trava",
                startMs: 1050.0,
                endMs: 1337.5,
                timestampMs: 1193.75,
                confidence: null,
              },
              {
                text: " importante:",
                startMs: 1350.0,
                endMs: 1975.0,
                timestampMs: 1662.5,
                confidence: null,
              },
              {
                text: " nada",
                startMs: 2225.0,
                endMs: 2512.5,
                timestampMs: 2368.75,
                confidence: null,
              },
              {
                text: " é",
                startMs: 2525.0,
                endMs: 2562.5,
                timestampMs: 2543.75,
                confidence: null,
              },
              {
                text: " enviado",
                startMs: 2575.0,
                endMs: 3150.0,
                timestampMs: 2862.5,
                confidence: null,
              },
              {
                text: " sem",
                startMs: 3162.5,
                endMs: 3412.5,
                timestampMs: 3287.5,
                confidence: null,
              },
              {
                text: " sua",
                startMs: 3425.0,
                endMs: 3637.5,
                timestampMs: 3531.25,
                confidence: null,
              },
              {
                text: " aprovação.",
                startMs: 3650.0,
                endMs: 4250.0,
                timestampMs: 3950.0,
                confidence: null,
              },
              {
                text: " Faltou",
                startMs: 5112.5,
                endMs: 5612.5,
                timestampMs: 5362.5,
                confidence: null,
              },
              {
                text: " informação?",
                startMs: 5625.0,
                endMs: 6350.0,
                timestampMs: 5987.5,
                confidence: null,
              },
              {
                text: " O",
                startMs: 7212.5,
                endMs: 7312.5,
                timestampMs: 7262.5,
                confidence: null,
              },
              {
                text: " fluxo",
                startMs: 7325.0,
                endMs: 7850.0,
                timestampMs: 7587.5,
                confidence: null,
              },
              {
                text: " pede",
                startMs: 7862.5,
                endMs: 8175.0,
                timestampMs: 8018.75,
                confidence: null,
              },
              {
                text: " revisão.",
                startMs: 8187.5,
                endMs: 8725.0,
                timestampMs: 8456.25,
                confidence: null,
              },
              {
                text: " Não",
                startMs: 9587.5,
                endMs: 9887.5,
                timestampMs: 9737.5,
                confidence: null,
              },
              {
                text: " é",
                startMs: 9900.0,
                endMs: 10000.0,
                timestampMs: 9950.0,
                confidence: null,
              },
              {
                text: " para",
                startMs: 10012.5,
                endMs: 10162.5,
                timestampMs: 10087.5,
                confidence: null,
              },
              {
                text: " inventar.",
                startMs: 10175.0,
                endMs: 10675.0,
                timestampMs: 10425.0,
                confidence: null,
              },
            ]}
          />
        </div>
      </Sequence>
      <Sequence
        name="Legenda result"
        from={1431}
        durationInFrames={300}
        premountFor={fps}
      >
        <div className="teste02-captions">
          <BasicCaptions
            name="Fala"
            premountFor={fps}
            width={840}
            combineTokensWithinMilliseconds={1350}
            style={{ position: "absolute", left: 100, top: 1460 }}
            captions={[
              {
                text: "O",
                startMs: 200.0,
                endMs: 325.0,
                timestampMs: 262.5,
                confidence: null,
              },
              {
                text: " ganho",
                startMs: 337.5,
                endMs: 637.5,
                timestampMs: 487.5,
                confidence: null,
              },
              {
                text: " é",
                startMs: 650.0,
                endMs: 687.5,
                timestampMs: 668.75,
                confidence: null,
              },
              {
                text: " reduzir",
                startMs: 700.0,
                endMs: 1175.0,
                timestampMs: 937.5,
                confidence: null,
              },
              {
                text: " o",
                startMs: 1187.5,
                endMs: 1225.0,
                timestampMs: 1206.25,
                confidence: null,
              },
              {
                text: " trabalho",
                startMs: 1237.5,
                endMs: 1675.0,
                timestampMs: 1456.25,
                confidence: null,
              },
              {
                text: " repetitivo.",
                startMs: 1687.5,
                endMs: 2437.5,
                timestampMs: 2062.5,
                confidence: null,
              },
              {
                text: " O",
                startMs: 3300.0,
                endMs: 3475.0,
                timestampMs: 3387.5,
                confidence: null,
              },
              {
                text: " tempo",
                startMs: 3487.5,
                endMs: 3812.5,
                timestampMs: 3650.0,
                confidence: null,
              },
              {
                text: " economizado",
                startMs: 3825.0,
                endMs: 4537.5,
                timestampMs: 4181.25,
                confidence: null,
              },
              {
                text: " varia.",
                startMs: 4550.0,
                endMs: 4962.5,
                timestampMs: 4756.25,
                confidence: null,
              },
              {
                text: " Meça",
                startMs: 5825.0,
                endMs: 6225.0,
                timestampMs: 6025.0,
                confidence: null,
              },
              {
                text: " o",
                startMs: 6237.5,
                endMs: 6300.0,
                timestampMs: 6268.75,
                confidence: null,
              },
              {
                text: " antes",
                startMs: 6312.5,
                endMs: 6625.0,
                timestampMs: 6468.75,
                confidence: null,
              },
              {
                text: " e",
                startMs: 6637.5,
                endMs: 6762.5,
                timestampMs: 6700.0,
                confidence: null,
              },
              {
                text: " o",
                startMs: 6775.0,
                endMs: 6812.5,
                timestampMs: 6793.75,
                confidence: null,
              },
              {
                text: " depois,",
                startMs: 6825.0,
                endMs: 7312.5,
                timestampMs: 7068.75,
                confidence: null,
              },
              {
                text: " incluindo",
                startMs: 7537.5,
                endMs: 8087.5,
                timestampMs: 7812.5,
                confidence: null,
              },
              {
                text: " a",
                startMs: 8100.0,
                endMs: 8137.5,
                timestampMs: 8118.75,
                confidence: null,
              },
              {
                text: " revisão.",
                startMs: 8150.0,
                endMs: 8700.0,
                timestampMs: 8425.0,
                confidence: null,
              },
            ]}
          />
        </div>
      </Sequence>
      <Sequence
        name="Legenda close"
        from={1731}
        durationInFrames={308}
        premountFor={fps}
      >
        <div className="teste02-captions">
          <BasicCaptions
            name="Fala"
            premountFor={fps}
            width={840}
            combineTokensWithinMilliseconds={1350}
            style={{ position: "absolute", left: 100, top: 1460 }}
            captions={[
              {
                text: "Comece",
                startMs: 200.0,
                endMs: 712.5,
                timestampMs: 456.25,
                confidence: null,
              },
              {
                text: " pequeno.",
                startMs: 725.0,
                endMs: 1200.0,
                timestampMs: 962.5,
                confidence: null,
              },
              {
                text: " Teste",
                startMs: 2062.5,
                endMs: 2412.5,
                timestampMs: 2237.5,
                confidence: null,
              },
              {
                text: " com",
                startMs: 2425.0,
                endMs: 2575.0,
                timestampMs: 2500.0,
                confidence: null,
              },
              {
                text: " dados",
                startMs: 2587.5,
                endMs: 2987.5,
                timestampMs: 2787.5,
                confidence: null,
              },
              {
                text: " fictícios",
                startMs: 3000.0,
                endMs: 3562.5,
                timestampMs: 3281.25,
                confidence: null,
              },
              {
                text: " e",
                startMs: 3575.0,
                endMs: 3675.0,
                timestampMs: 3625.0,
                confidence: null,
              },
              {
                text: " confira",
                startMs: 3687.5,
                endMs: 4100.0,
                timestampMs: 3893.75,
                confidence: null,
              },
              {
                text: " o",
                startMs: 4112.5,
                endMs: 4125.0,
                timestampMs: 4118.75,
                confidence: null,
              },
              {
                text: " resultado.",
                startMs: 4137.5,
                endMs: 4775.0,
                timestampMs: 4456.25,
                confidence: null,
              },
              {
                text: " Qual",
                startMs: 5637.5,
                endMs: 5875.0,
                timestampMs: 5756.25,
                confidence: null,
              },
              {
                text: " tarefa",
                startMs: 5887.5,
                endMs: 6375.0,
                timestampMs: 6131.25,
                confidence: null,
              },
              {
                text: " você",
                startMs: 6387.5,
                endMs: 6637.5,
                timestampMs: 6512.5,
                confidence: null,
              },
              {
                text: " automatizaria",
                startMs: 6650.0,
                endMs: 7487.5,
                timestampMs: 7068.75,
                confidence: null,
              },
              {
                text: " primeiro?",
                startMs: 7500.0,
                endMs: 7950.0,
                timestampMs: 7725.0,
                confidence: null,
              },
              {
                text: " Futuro",
                startMs: 8812.5,
                endMs: 9287.5,
                timestampMs: 9050.0,
                confidence: null,
              },
              {
                text: " Prático.",
                startMs: 9300.0,
                endMs: 9800.0,
                timestampMs: 9550.0,
                confidence: null,
              },
            ]}
          />
        </div>
      </Sequence>
    </>
  );
};
