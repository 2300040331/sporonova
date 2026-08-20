import React from "react";

export interface SectionStylesConfig {
  fontFamily?: string;
  fontSize?: number;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  headingSize?: number;
  headingColor?: string;
  headingWeight?: string;
  paragraphSize?: number;
  paragraphColor?: string;
  bold?: boolean;
  italic?: boolean;
  textAlign?: "left" | "center" | "right" | "justify";
  lineHeight?: string;
  letterSpacing?: string;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  marginTop?: number;
  marginBottom?: number;
  buttonColor?: string;
  buttonTextColor?: string;
  buttonTextSize?: number;
  buttonWeight?: string;
  borderRadius?: number;
  iconSize?: number;
  iconColor?: string;
  cardBgColor?: string;
  cardTextColor?: string;
  cardBorderRadius?: number;
  cardBorderColor?: string;
}

export function getSectionStyles(config?: SectionStylesConfig): React.CSSProperties {
  if (!config) return {};
  const styles: React.CSSProperties = {};

  if (config.fontFamily) styles.fontFamily = config.fontFamily;
  if (config.textColor) styles.color = config.textColor;
  if (config.backgroundColor) styles.backgroundColor = config.backgroundColor;
  if (config.borderColor) styles.borderColor = config.borderColor;
  if (config.textAlign) styles.textAlign = config.textAlign;
  if (config.lineHeight) styles.lineHeight = config.lineHeight;
  if (config.letterSpacing) styles.letterSpacing = config.letterSpacing;
  
  if (config.paddingTop !== undefined) styles.paddingTop = `${config.paddingTop}px`;
  if (config.paddingBottom !== undefined) styles.paddingBottom = `${config.paddingBottom}px`;
  if (config.paddingLeft !== undefined) styles.paddingLeft = `${config.paddingLeft}px`;
  if (config.paddingRight !== undefined) styles.paddingRight = `${config.paddingRight}px`;
  
  if (config.marginTop !== undefined) styles.marginTop = `${config.marginTop}px`;
  if (config.marginBottom !== undefined) styles.marginBottom = `${config.marginBottom}px`;
  if (config.borderRadius !== undefined) styles.borderRadius = `${config.borderRadius}px`;

  return styles;
}

export function getHeadingStyles(config?: SectionStylesConfig): React.CSSProperties {
  if (!config) return {};
  const styles: React.CSSProperties = {};

  if (config.fontFamily) styles.fontFamily = config.fontFamily;
  if (config.headingSize !== undefined) styles.fontSize = `${config.headingSize}px`;
  if (config.headingColor) styles.color = config.headingColor;
  else if (config.textColor) styles.color = config.textColor;
  if (config.headingWeight) styles.fontWeight = config.headingWeight;
  if (config.bold !== undefined) styles.fontWeight = config.bold ? "bold" : "normal";
  if (config.italic !== undefined) styles.fontStyle = config.italic ? "italic" : "normal";
  if (config.textAlign) styles.textAlign = config.textAlign;
  if (config.letterSpacing) styles.letterSpacing = config.letterSpacing;

  return styles;
}

export function getParagraphStyles(config?: SectionStylesConfig): React.CSSProperties {
  if (!config) return {};
  const styles: React.CSSProperties = {};

  if (config.fontFamily) styles.fontFamily = config.fontFamily;
  if (config.paragraphSize !== undefined) styles.fontSize = `${config.paragraphSize}px`;
  if (config.paragraphColor) styles.color = config.paragraphColor;
  else if (config.textColor) styles.color = config.textColor;
  if (config.italic !== undefined) styles.fontStyle = config.italic ? "italic" : "normal";
  if (config.lineHeight) styles.lineHeight = config.lineHeight;
  if (config.letterSpacing) styles.letterSpacing = config.letterSpacing;

  return styles;
}

export function getButtonStyles(config?: SectionStylesConfig): React.CSSProperties {
  if (!config) return {};
  const styles: React.CSSProperties = {};

  if (config.fontFamily) styles.fontFamily = config.fontFamily;
  if (config.buttonColor) styles.backgroundColor = config.buttonColor;
  if (config.buttonTextColor) styles.color = config.buttonTextColor;
  if (config.buttonTextSize !== undefined) styles.fontSize = `${config.buttonTextSize}px`;
  if (config.buttonWeight) styles.fontWeight = config.buttonWeight;
  if (config.borderRadius !== undefined) styles.borderRadius = `${config.borderRadius}px`;

  return styles;
}

export function getCardStyles(config?: SectionStylesConfig): React.CSSProperties {
  if (!config) return {};
  const styles: React.CSSProperties = {};

  if (config.fontFamily) styles.fontFamily = config.fontFamily;
  if (config.cardBgColor) styles.backgroundColor = config.cardBgColor;
  if (config.cardTextColor) styles.color = config.cardTextColor;
  else if (config.textColor) styles.color = config.textColor;
  if (config.cardBorderRadius !== undefined) styles.borderRadius = `${config.cardBorderRadius}px`;
  else if (config.borderRadius !== undefined) styles.borderRadius = `${config.borderRadius}px`;
  if (config.cardBorderColor) styles.borderColor = config.cardBorderColor;
  else if (config.borderColor) styles.borderColor = config.cardBorderColor || config.borderColor;

  return styles;
}

export function getIconStyles(config?: SectionStylesConfig): React.CSSProperties {
  if (!config) return {};
  const styles: React.CSSProperties = {};

  if (config.iconColor) styles.color = config.iconColor;
  if (config.iconSize !== undefined) {
    styles.width = `${config.iconSize}px`;
    styles.height = `${config.iconSize}px`;
  }

  return styles;
}
