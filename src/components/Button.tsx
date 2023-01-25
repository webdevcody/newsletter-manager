import classNames from "classnames";

export function Button(props: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button
      className={classNames(
        "rounded-sm bg-wdc-primary p-3 text-lg text-black hover:bg-wdc-light",
        props.className
      )}
    >
      {props.children}
    </button>
  );
}
