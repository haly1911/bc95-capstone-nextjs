interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return <p className="mt-1 text-xs text-destructive">{message}</p>;
};

export default FormError;
