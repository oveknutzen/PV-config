import React, { useState } from 'react';

function App() {
  const [step, setStep] = useState(1);
  const [selfMount, setSelfMount] = useState(null);
  const [consumption, setConsumption] = useState(0);
  const [householdSize, setHouseholdSize] = useState(0);
  const [roofType, setRoofType] = useState('');
  const [roofAngle, setRoofAngle] = useState(0);
  const [electricianService, setElectricianService] = useState(false);
  const [planningService, setPlanningService] = useState(false);
  const [price, setPrice] = useState(0);

  const nextStep = () => setStep(step + 1);

  const handleConsumption = (value) => {
    setConsumption(value);
    nextStep();
  };

  const handleHouseholdSize = (size) => {
    const kwhMap = {
      1: 2000,
      2: 4000,
      3: 6000,
      4: 8000,
      5: 10000,
    };
    setHouseholdSize(size);
    setConsumption(kwhMap[size]);
    nextStep();
  };

  const handleRoofAngle = (angle) => {
    setRoofAngle(angle);
    nextStep();
  };

  const calculatePrice = () => {
    const basePrice = 0.8 * 2 * consumption*250;
    const electricianPrice = electricianService ? 1000 : 0;
    const planningPrice = planningService ? 1000 : 0;
    setPrice(basePrice + electricianPrice + planningPrice);
  };

  return (
    <div>
      <h1>PV-Konfigurator</h1>
      <div>{(step / 7) * 100}% abgeschlossen</div>
      {step === 1 && (
        <div>
          <p>Würden Sie die PV-Anlage selbst montieren?</p>
          <button onClick={() => { setSelfMount(true); nextStep(); }}>Ja</button>
          <button onClick={() => { setSelfMount(false); nextStep(); }}>Nein</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <p>Geben Sie Ihren jährlichen Stromverbrauch in kWh an:</p>
          <input type="number" onChange={(e) => handleConsumption(e.target.value)} />
          <p>Oder wählen Sie die Anzahl der Personen in Ihrem Haushalt:</p>
          {[1, 2, 3, 4, 5].map((size) => (
            <button key={size} onClick={() => handleHouseholdSize(size)}>
              {size} Personen
            </button>
          ))}
        </div>
      )}
      {step === 3 && (
        <div>
          <p>Wählen Sie Ihren Dachtyp:</p>
          {['Flachdach', 'Schrägdach', 'Pultdach'].map((type) => (
            <button key={type} onClick={() => { setRoofType(type); nextStep(); }}>
              {type}
            </button>
          ))}
        </div>
      )}
      {step === 4 && (
        <div>
          <p>Wählen Sie Ihre Dachneigung:</p>
          {[5, 15, 20, 30, 45].map((angle) => (
            <button key={angle} onClick={() => handleRoofAngle(angle)}>
              {angle}%
            </button>
          ))}
        </div>
      )}
      {step === 5 && (
        <div>
          <p>Möchten Sie unseren Elektrikerservice in Anspruch nehmen?</p>
          <button onClick={() => { setElectricianService(true); nextStep(); calculatePrice(); }}>Ja</button>
          <button onClick={() => { setElectricianService(false); nextStep(); calculatePrice(); }}>Nein</button>
        </div>
      )}
      {step === 6 && (
        <div>
          <p>Möchten Sie, dass die Planung und Anmeldung der Anlage auch durch uns übernommen wird?</p>
          <button onClick={() => { setPlanningService(true); nextStep(); calculatePrice(); }}>Ja</button>
          <button onClick={() => { setPlanningService(false); nextStep(); calculatePrice(); }}>Nein</button>
        </div>
      )}
      {step === 7 && (
        <div>
          <p>Endpreis: {price} €</p>
        </div>
      )}
    </div>
  );
}

export default App;