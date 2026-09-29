"use client";
import usePreferenceStore from "@/stores/preferenceStore";
import MarkdownPreview from "@uiw/react-markdown-preview";

const ProductDescription = ({ source }) => {
  const theme = usePreferenceStore((state) => state.theme);

  return (
    <MarkdownPreview
      source={source}
      style={{ padding: 16, background: "#0000" }}
      wrapperElement={{
        "data-color-mode": theme,
      }}
    />
  );
};

export default ProductDescription;