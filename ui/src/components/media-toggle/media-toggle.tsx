import React, {MouseEvent} from 'react';
import {
  MediaToggleWrapper,
  Option,
  Highlighter,
  OptionLabel,
} from './media-toggle.styles';
import {useSpring, config} from 'react-spring';
import useResponsive from '../../effects/useResponsive';

export interface MediaToggleOption {
  value: string;
  label: string;
  selected?: boolean;
  icon?: React.ReactNode;
}

export interface MediaToggleModel {
  options: MediaToggleOption[];
  onSelect?: (val: MediaToggleOption) => void;
  onSelectionStart?: () => void;
}

const MediaToggle: React.FunctionComponent<MediaToggleModel> = ({
  options,
  onSelect,
}) => {
  const [opts, setOpts] = React.useState({
    highlighterOffset: 0,
    items: options.some((opt) => opt.selected)
      ? options
      : Array.from(options, (opt, index) => {
          if (index === 0) {
            return Object.assign({}, opt, {
              selected: true,
            });
          } else {
            return Object.assign({}, opt, {
              selected: false,
            });
          }
        }),
  });

  const resx = useResponsive();

  const defaultRef = React.useRef<HTMLDivElement>(null);

  const [props, setProps] = useSpring(() => ({
    left: -100,
    width: 0,
    opacity: 0,
    config: config.default,
  }));

  React.useEffect(() => {
    requestAnimationFrame(() => {
      if (defaultRef && defaultRef.current) {
        const {offsetLeft, offsetWidth} = defaultRef.current;
        setOpts({
          items: opts.items,
          highlighterOffset: offsetLeft,
        });

        setProps({
          left: offsetLeft,
          width: offsetWidth,
          opacity: 1,
        });
      }
    });
  }, []);

  const handleToggle = (
    selectedOption: MediaToggleOption,
    event: MouseEvent<HTMLDivElement>
  ) => {
    const newOpts = opts.items.map((opt) => {
      if (opt.value === selectedOption.value) {
        return Object.assign({}, opt, {
          selected: true,
        });
      } else {
        return Object.assign({}, opt, {selected: false});
      }
    });
    setOpts({
      items: newOpts,
      highlighterOffset: event.currentTarget.offsetLeft,
    });
    setProps({
      left: event.currentTarget.offsetLeft,
      width: event.currentTarget.offsetWidth,
      immediate: false,
      onStart: () => onSelect && onSelect(selectedOption),
    });
  };

  return (
    <MediaToggleWrapper>
      <Highlighter left={opts.highlighterOffset} style={props}></Highlighter>
      {opts.items.map((option) => (
        <Option
          onClickCapture={(ev: MouseEvent<HTMLDivElement>) =>
            handleToggle(option, ev)
          }
          title={option.label}
          selected={option.selected}
          key={option.label}
          ref={option.selected ? defaultRef : null}
          resx={resx}
        >
          {option.icon}
          <OptionLabel marginLess={!option.icon}>{option.label}</OptionLabel>
        </Option>
      ))}
    </MediaToggleWrapper>
  );
};

export default MediaToggle;
