import './History.css'

export const History = () => {
    const items = ['Первый элемент', 'Второй элемент', 'Третий элемент'];

    return (
        <div className="history-container">
            История:
            {items.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </div>
    );
};

