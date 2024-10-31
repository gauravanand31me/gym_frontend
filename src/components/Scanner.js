import { Scanner } from '@yudiel/react-qr-scanner';

const ReactScan = () => {
    return <Scanner onScan={(result) => console.log(result)} />;
};

export default ReactScan;


