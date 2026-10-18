import { Sequence, useVideoConfig } from "remotion";
import { BasicCaptions } from "../teste02/BasicCaptions";
export const RoadsterCaptions = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      <Sequence name="Legenda hook" durationInFrames={150} premountFor={fps}>
        <div className="roadster-captions">
          <BasicCaptions
            name="Narração"
            width={840}
            combineTokensWithinMilliseconds={1200}
            style={{ position: "absolute", left: 100, top: 1450 }}
            premountFor={fps}
            captions={[
              {
                text: "Um",
                startMs: 200.0,
                endMs: 412.5,
                timestampMs: 306.25,
                confidence: null,
              },
              {
                text: " Tesla",
                startMs: 425.0,
                endMs: 850.0,
                timestampMs: 637.5,
                confidence: null,
              },
              {
                text: " saltou",
                startMs: 862.5,
                endMs: 1300.0,
                timestampMs: 1081.25,
                confidence: null,
              },
              {
                text: " e",
                startMs: 1312.5,
                endMs: 1350.0,
                timestampMs: 1331.25,
                confidence: null,
              },
              {
                text: " girou",
                startMs: 1362.5,
                endMs: 1650.0,
                timestampMs: 1506.25,
                confidence: null,
              },
              {
                text: " no",
                startMs: 1662.5,
                endMs: 1787.5,
                timestampMs: 1725.0,
                confidence: null,
              },
              {
                text: " ar.",
                startMs: 1800.0,
                endMs: 1962.5,
                timestampMs: 1881.25,
                confidence: null,
              },
              {
                text: " Mas",
                startMs: 2825.0,
                endMs: 3050.0,
                timestampMs: 2937.5,
                confidence: null,
              },
              {
                text: " olhe",
                startMs: 3062.5,
                endMs: 3387.5,
                timestampMs: 3225.0,
                confidence: null,
              },
              {
                text: " a",
                startMs: 3400.0,
                endMs: 3450.0,
                timestampMs: 3425.0,
                confidence: null,
              },
              {
                text: " letra",
                startMs: 3462.5,
                endMs: 3800.0,
                timestampMs: 3631.25,
                confidence: null,
              },
              {
                text: " miúda.",
                startMs: 3812.5,
                endMs: 4275.0,
                timestampMs: 4043.75,
                confidence: null,
              },
            ]}
          />
        </div>
      </Sequence>
      <Sequence
        name="Legenda event"
        from={150}
        durationInFrames={160}
        premountFor={fps}
      >
        <div className="roadster-captions">
          <BasicCaptions
            name="Narração"
            width={840}
            combineTokensWithinMilliseconds={1200}
            style={{ position: "absolute", left: 100, top: 1450 }}
            premountFor={fps}
            captions={[
              {
                text: "Quinze",
                startMs: 200.0,
                endMs: 550.0,
                timestampMs: 375.0,
                confidence: null,
              },
              {
                text: " de",
                startMs: 562.5,
                endMs: 650.0,
                timestampMs: 606.25,
                confidence: null,
              },
              {
                text: " outubro,",
                startMs: 662.5,
                endMs: 1162.5,
                timestampMs: 912.5,
                confidence: null,
              },
              {
                text: " Texas.",
                startMs: 1412.5,
                endMs: 2037.5,
                timestampMs: 1725.0,
                confidence: null,
              },
              {
                text: " A",
                startMs: 2900.0,
                endMs: 3037.5,
                timestampMs: 2968.75,
                confidence: null,
              },
              {
                text: " Tesla",
                startMs: 3050.0,
                endMs: 3475.0,
                timestampMs: 3262.5,
                confidence: null,
              },
              {
                text: " demonstrou",
                startMs: 3487.5,
                endMs: 3962.5,
                timestampMs: 3725.0,
                confidence: null,
              },
              {
                text: " o",
                startMs: 3975.0,
                endMs: 4025.0,
                timestampMs: 4000.0,
                confidence: null,
              },
              {
                text: " novo",
                startMs: 4037.5,
                endMs: 4350.0,
                timestampMs: 4193.75,
                confidence: null,
              },
              {
                text: " Roadster.",
                startMs: 4362.5,
                endMs: 4925.0,
                timestampMs: 4643.75,
                confidence: null,
              },
            ]}
          />
        </div>
      </Sequence>
      <Sequence
        name="Legenda mechanism"
        from={310}
        durationInFrames={307}
        premountFor={fps}
      >
        <div className="roadster-captions">
          <BasicCaptions
            name="Narração"
            width={840}
            combineTokensWithinMilliseconds={1200}
            style={{ position: "absolute", left: 100, top: 1450 }}
            premountFor={fps}
            captions={[
              {
                text: "Propulsores",
                startMs: 200.0,
                endMs: 937.5,
                timestampMs: 568.75,
                confidence: null,
              },
              {
                text: " de",
                startMs: 950.0,
                endMs: 1037.5,
                timestampMs: 993.75,
                confidence: null,
              },
              {
                text: " gás",
                startMs: 1050.0,
                endMs: 1325.0,
                timestampMs: 1187.5,
                confidence: null,
              },
              {
                text: " frio",
                startMs: 1337.5,
                endMs: 1637.5,
                timestampMs: 1487.5,
                confidence: null,
              },
              {
                text: " expulsam",
                startMs: 1650.0,
                endMs: 2200.0,
                timestampMs: 1925.0,
                confidence: null,
              },
              {
                text: " gás",
                startMs: 2212.5,
                endMs: 2500.0,
                timestampMs: 2356.25,
                confidence: null,
              },
              {
                text: " numa",
                startMs: 2512.5,
                endMs: 2762.5,
                timestampMs: 2637.5,
                confidence: null,
              },
              {
                text: " direção.",
                startMs: 2775.0,
                endMs: 3300.0,
                timestampMs: 3037.5,
                confidence: null,
              },
              {
                text: " O",
                startMs: 4162.5,
                endMs: 4325.0,
                timestampMs: 4243.75,
                confidence: null,
              },
              {
                text: " carro",
                startMs: 4337.5,
                endMs: 4675.0,
                timestampMs: 4506.25,
                confidence: null,
              },
              {
                text: " recebe",
                startMs: 4687.5,
                endMs: 5150.0,
                timestampMs: 4918.75,
                confidence: null,
              },
              {
                text: " impulso",
                startMs: 5162.5,
                endMs: 5600.0,
                timestampMs: 5381.25,
                confidence: null,
              },
              {
                text: " na",
                startMs: 5612.5,
                endMs: 5762.5,
                timestampMs: 5687.5,
                confidence: null,
              },
              {
                text: " outra.",
                startMs: 5775.0,
                endMs: 6112.5,
                timestampMs: 5943.75,
                confidence: null,
              },
              {
                text: " A",
                startMs: 6975.0,
                endMs: 7100.0,
                timestampMs: 7037.5,
                confidence: null,
              },
              {
                text: " Tesla",
                startMs: 7112.5,
                endMs: 7487.5,
                timestampMs: 7300.0,
                confidence: null,
              },
              {
                text: " diz",
                startMs: 7500.0,
                endMs: 7687.5,
                timestampMs: 7593.75,
                confidence: null,
              },
              {
                text: " usar",
                startMs: 7700.0,
                endMs: 8100.0,
                timestampMs: 7900.0,
                confidence: null,
              },
              {
                text: " tecnologia",
                startMs: 8112.5,
                endMs: 8850.0,
                timestampMs: 8481.25,
                confidence: null,
              },
              {
                text: " da",
                startMs: 8862.5,
                endMs: 8962.5,
                timestampMs: 8912.5,
                confidence: null,
              },
              {
                text: " SpaceX.",
                startMs: 8975.0,
                endMs: 9800.0,
                timestampMs: 9387.5,
                confidence: null,
              },
            ]}
          />
        </div>
      </Sequence>
      <Sequence
        name="Legenda limit"
        from={617}
        durationInFrames={240}
        premountFor={fps}
      >
        <div className="roadster-captions">
          <BasicCaptions
            name="Narração"
            width={840}
            combineTokensWithinMilliseconds={1200}
            style={{ position: "absolute", left: 100, top: 1450 }}
            premountFor={fps}
            captions={[
              {
                text: "Só",
                startMs: 200.0,
                endMs: 525.0,
                timestampMs: 362.5,
                confidence: null,
              },
              {
                text: " que",
                startMs: 537.5,
                endMs: 650.0,
                timestampMs: 593.75,
                confidence: null,
              },
              {
                text: " saltar",
                startMs: 662.5,
                endMs: 1100.0,
                timestampMs: 881.25,
                confidence: null,
              },
              {
                text: " não",
                startMs: 1112.5,
                endMs: 1300.0,
                timestampMs: 1206.25,
                confidence: null,
              },
              {
                text: " prova",
                startMs: 1312.5,
                endMs: 1662.5,
                timestampMs: 1487.5,
                confidence: null,
              },
              {
                text: " voo",
                startMs: 1675.0,
                endMs: 1875.0,
                timestampMs: 1775.0,
                confidence: null,
              },
              {
                text: " contínuo.",
                startMs: 1887.5,
                endMs: 2487.5,
                timestampMs: 2187.5,
                confidence: null,
              },
              {
                text: " Sustentar",
                startMs: 3350.0,
                endMs: 4087.5,
                timestampMs: 3718.75,
                confidence: null,
              },
              {
                text: " o",
                startMs: 4100.0,
                endMs: 4162.5,
                timestampMs: 4131.25,
                confidence: null,
              },
              {
                text: " peso",
                startMs: 4175.0,
                endMs: 4512.5,
                timestampMs: 4343.75,
                confidence: null,
              },
              {
                text: " exige",
                startMs: 4525.0,
                endMs: 4875.0,
                timestampMs: 4700.0,
                confidence: null,
              },
              {
                text: " empuxo.",
                startMs: 4887.5,
                endMs: 5387.5,
                timestampMs: 5137.5,
                confidence: null,
              },
              {
                text: " E",
                startMs: 6250.0,
                endMs: 6375.0,
                timestampMs: 6312.5,
                confidence: null,
              },
              {
                text: " o",
                startMs: 6387.5,
                endMs: 6437.5,
                timestampMs: 6412.5,
                confidence: null,
              },
              {
                text: " gás",
                startMs: 6450.0,
                endMs: 6700.0,
                timestampMs: 6575.0,
                confidence: null,
              },
              {
                text: " é",
                startMs: 6712.5,
                endMs: 6850.0,
                timestampMs: 6781.25,
                confidence: null,
              },
              {
                text: " limitado.",
                startMs: 6862.5,
                endMs: 7537.5,
                timestampMs: 7200.0,
                confidence: null,
              },
            ]}
          />
        </div>
      </Sequence>
      <Sequence
        name="Legenda claim"
        from={857}
        durationInFrames={214}
        premountFor={fps}
      >
        <div className="roadster-captions">
          <BasicCaptions
            name="Narração"
            width={840}
            combineTokensWithinMilliseconds={1200}
            style={{ position: "absolute", left: 100, top: 1450 }}
            premountFor={fps}
            captions={[
              {
                text: "Zero",
                startMs: 200.0,
                endMs: 525.0,
                timestampMs: 362.5,
                confidence: null,
              },
              {
                text: " a",
                startMs: 537.5,
                endMs: 550.0,
                timestampMs: 543.75,
                confidence: null,
              },
              {
                text: " noventa",
                startMs: 562.5,
                endMs: 962.5,
                timestampMs: 762.5,
                confidence: null,
              },
              {
                text: " e",
                startMs: 975.0,
                endMs: 1000.0,
                timestampMs: 987.5,
                confidence: null,
              },
              {
                text: " sete",
                startMs: 1012.5,
                endMs: 1312.5,
                timestampMs: 1162.5,
                confidence: null,
              },
              {
                text: " em",
                startMs: 1325.0,
                endMs: 1387.5,
                timestampMs: 1356.25,
                confidence: null,
              },
              {
                text: " menos",
                startMs: 1400.0,
                endMs: 1737.5,
                timestampMs: 1568.75,
                confidence: null,
              },
              {
                text: " de",
                startMs: 1750.0,
                endMs: 1825.0,
                timestampMs: 1787.5,
                confidence: null,
              },
              {
                text: " um",
                startMs: 1837.5,
                endMs: 1912.5,
                timestampMs: 1875.0,
                confidence: null,
              },
              {
                text: " segundo?",
                startMs: 1925.0,
                endMs: 2450.0,
                timestampMs: 2187.5,
                confidence: null,
              },
              {
                text: " Afirmação",
                startMs: 3312.5,
                endMs: 4075.0,
                timestampMs: 3693.75,
                confidence: null,
              },
              {
                text: " da",
                startMs: 4087.5,
                endMs: 4225.0,
                timestampMs: 4156.25,
                confidence: null,
              },
              {
                text: " Tesla.",
                startMs: 4237.5,
                endMs: 4725.0,
                timestampMs: 4481.25,
                confidence: null,
              },
              {
                text: " Não",
                startMs: 5587.5,
                endMs: 5837.5,
                timestampMs: 5712.5,
                confidence: null,
              },
              {
                text: " medimos",
                startMs: 5850.0,
                endMs: 6250.0,
                timestampMs: 6050.0,
                confidence: null,
              },
              {
                text: " isso.",
                startMs: 6262.5,
                endMs: 6725.0,
                timestampMs: 6493.75,
                confidence: null,
              },
            ]}
          />
        </div>
      </Sequence>
      <Sequence
        name="Legenda history"
        from={1071}
        durationInFrames={240}
        premountFor={fps}
      >
        <div className="roadster-captions">
          <BasicCaptions
            name="Narração"
            width={840}
            combineTokensWithinMilliseconds={1200}
            style={{ position: "absolute", left: 100, top: 1450 }}
            premountFor={fps}
            captions={[
              {
                text: "O",
                startMs: 200.0,
                endMs: 312.5,
                timestampMs: 256.25,
                confidence: null,
              },
              {
                text: " projeto",
                startMs: 325.0,
                endMs: 925.0,
                timestampMs: 625.0,
                confidence: null,
              },
              {
                text: " surgiu",
                startMs: 937.5,
                endMs: 1437.5,
                timestampMs: 1187.5,
                confidence: null,
              },
              {
                text: " em",
                startMs: 1450.0,
                endMs: 1525.0,
                timestampMs: 1487.5,
                confidence: null,
              },
              {
                text: " dois",
                startMs: 1537.5,
                endMs: 1775.0,
                timestampMs: 1656.25,
                confidence: null,
              },
              {
                text: " mil",
                startMs: 1787.5,
                endMs: 1925.0,
                timestampMs: 1856.25,
                confidence: null,
              },
              {
                text: " e",
                startMs: 1937.5,
                endMs: 1987.5,
                timestampMs: 1962.5,
                confidence: null,
              },
              {
                text: " dezessete.",
                startMs: 2000.0,
                endMs: 2700.0,
                timestampMs: 2350.0,
                confidence: null,
              },
              {
                text: " Musk",
                startMs: 3562.5,
                endMs: 3987.5,
                timestampMs: 3775.0,
                confidence: null,
              },
              {
                text: " fala",
                startMs: 4000.0,
                endMs: 4287.5,
                timestampMs: 4143.75,
                confidence: null,
              },
              {
                text: " em",
                startMs: 4300.0,
                endMs: 4375.0,
                timestampMs: 4337.5,
                confidence: null,
              },
              {
                text: " produção",
                startMs: 4387.5,
                endMs: 4962.5,
                timestampMs: 4675.0,
                confidence: null,
              },
              {
                text: " para",
                startMs: 4975.0,
                endMs: 5150.0,
                timestampMs: 5062.5,
                confidence: null,
              },
              {
                text: " dois",
                startMs: 5162.5,
                endMs: 5362.5,
                timestampMs: 5262.5,
                confidence: null,
              },
              {
                text: " mil",
                startMs: 5375.0,
                endMs: 5525.0,
                timestampMs: 5450.0,
                confidence: null,
              },
              {
                text: " e",
                startMs: 5537.5,
                endMs: 5600.0,
                timestampMs: 5568.75,
                confidence: null,
              },
              {
                text: " vinte",
                startMs: 5612.5,
                endMs: 5862.5,
                timestampMs: 5737.5,
                confidence: null,
              },
              {
                text: " e",
                startMs: 5875.0,
                endMs: 5900.0,
                timestampMs: 5887.5,
                confidence: null,
              },
              {
                text: " oito.",
                startMs: 5912.5,
                endMs: 6212.5,
                timestampMs: 6062.5,
                confidence: null,
              },
            ]}
          />
        </div>
      </Sequence>
      <Sequence
        name="Legenda fineprint"
        from={1311}
        durationInFrames={240}
        premountFor={fps}
      >
        <div className="roadster-captions">
          <BasicCaptions
            name="Narração"
            width={840}
            combineTokensWithinMilliseconds={1200}
            style={{ position: "absolute", left: 100, top: 1450 }}
            premountFor={fps}
            captions={[
              {
                text: "Na",
                startMs: 200.0,
                endMs: 387.5,
                timestampMs: 293.75,
                confidence: null,
              },
              {
                text: " letra",
                startMs: 400.0,
                endMs: 712.5,
                timestampMs: 556.25,
                confidence: null,
              },
              {
                text: " miúda,",
                startMs: 725.0,
                endMs: 1162.5,
                timestampMs: 943.75,
                confidence: null,
              },
              {
                text: " a",
                startMs: 1362.5,
                endMs: 1475.0,
                timestampMs: 1418.75,
                confidence: null,
              },
              {
                text: " Tesla",
                startMs: 1487.5,
                endMs: 1837.5,
                timestampMs: 1662.5,
                confidence: null,
              },
              {
                text: " avisa:",
                startMs: 1850.0,
                endMs: 2250.0,
                timestampMs: 2050.0,
                confidence: null,
              },
              {
                text: " versão",
                startMs: 2625.0,
                endMs: 3075.0,
                timestampMs: 2850.0,
                confidence: null,
              },
              {
                text: " Rocket,",
                startMs: 3087.5,
                endMs: 3550.0,
                timestampMs: 3318.75,
                confidence: null,
              },
              {
                text: " não",
                startMs: 3812.5,
                endMs: 4025.0,
                timestampMs: 3918.75,
                confidence: null,
              },
              {
                text: " aprovada",
                startMs: 4037.5,
                endMs: 4600.0,
                timestampMs: 4318.75,
                confidence: null,
              },
              {
                text: " para",
                startMs: 4612.5,
                endMs: 4800.0,
                timestampMs: 4706.25,
                confidence: null,
              },
              {
                text: " vias",
                startMs: 4812.5,
                endMs: 5100.0,
                timestampMs: 4956.25,
                confidence: null,
              },
              {
                text: " públicas.",
                startMs: 5112.5,
                endMs: 5725.0,
                timestampMs: 5418.75,
                confidence: null,
              },
            ]}
          />
        </div>
      </Sequence>
    </>
  );
};
