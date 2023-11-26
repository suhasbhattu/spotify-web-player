import styles from "./styles.module.css";

interface SliderProps {
  max: number;
  min: number;
  value: number;
  onChange: (value: number) => void;
  classNames: string;
}

export const Slider = (props: SliderProps) => {
  const onSliderChange = (event: any) => {
    props.onChange(event.target.value);
  };

  return (
    <input
      type="range"
      min={props.min}
      max={props.max}
      value={props.value}
      className={`${styles.slider} ${props.classNames}`}
      onInput={onSliderChange}
    />
  );
};
export default Slider;
