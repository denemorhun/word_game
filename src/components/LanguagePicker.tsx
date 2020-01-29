import React from "react";
import { LANGUAGES } from "../gameConsts";

interface Props {
  language: string;
  onChange: (lang: string) => void;
}

export default function LanguagePicker(props: Props) {
  console.log(props.language);
  const languages = LANGUAGES.map(lang => {
    return (
      <li
        key={lang["code"]}
        data-active={props.language === lang["code"] ? true : null}
        onClick={() => props.onChange(lang["code"])}
      >
        {lang["name"]}
      </li>
    );
  });

  return (
    <div className="languages">
      <ul>{languages}</ul>
    </div>
  );
}
