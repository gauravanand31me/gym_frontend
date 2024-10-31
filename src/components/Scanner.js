import { Scanner } from '@yudiel/react-qr-scanner';

const ReactScan = ({onScan}) => {
    return <Scanner onScan={onScan} />;
};

export default ReactScan;


