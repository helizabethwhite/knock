import './Button.css';

interface ButtonProps {
    type?: 'icon' | 'submit' | 'cancel';
    size?: 'small' | 'large';
    content?: string | React.ReactNode;
    onClick?: () => void;
    title?: string;
    border?: boolean;
    classList?: string;
}

const Button = ({ type = 'icon', size = 'small', content, onClick, title, border, classList }: ButtonProps) => {
    return (
        <button
            title={title}
            className={`${type} ${size} ${border === false ? 'no-border' : ''} ${classList ?? ''}`}
            onClick={onClick}
            type={type === 'submit' ? 'submit' : 'button'}
        >
            {content}
        </button>
    );
};

export default Button;
