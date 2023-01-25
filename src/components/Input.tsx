import classNames from "classnames";

export function Input(props: React.HTMLProps<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={classNames("rounded p-3 text-wdc-dark", props.className)}
    ></input>
  );
}
