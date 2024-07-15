import {
  Box,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
  Textarea
} from '@chakra-ui/react';
import { WorkflowIOValueTypeEnum } from '@fastgpt/global/core/workflow/constants';
import QuestionTip from '@fastgpt/web/components/common/MyTooltip/QuestionTip';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

const JsonEditor = dynamic(() => import('@fastgpt/web/components/common/Textarea/JsonEditor'));

const RenderPluginInput = ({
  value,
  onChange,
  label,
  description,
  isDisabled,
  valueType,
  placeholder,
  required,
  min,
  max,
  isInvalid
}: {
  value: any;
  onChange: () => void;
  label: string;
  description?: string;
  isDisabled?: boolean;
  valueType: WorkflowIOValueTypeEnum | undefined;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  isInvalid: boolean;
}) => {
  const { t } = useTranslation();

  const render = (() => {
    if (valueType === WorkflowIOValueTypeEnum.string) {
      return (
        <Textarea
          value={value}
          onChange={onChange}
          isDisabled={isDisabled}
          placeholder={t(placeholder)}
          bg={'myGray.50'}
          isInvalid={isInvalid}
        />
      );
    }
    if (valueType === WorkflowIOValueTypeEnum.number) {
      return (
        <NumberInput
          step={1}
          min={min}
          max={max}
          bg={'myGray.50'}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
        >
          <NumberInputField value={value} onChange={onChange} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      );
    }
    if (valueType === WorkflowIOValueTypeEnum.boolean) {
      return (
        <Switch
          isChecked={value}
          onChange={onChange}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
        />
      );
    }

    return (
      <JsonEditor
        bg={'myGray.50'}
        placeholder={t(placeholder || '')}
        resize
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
      />
    );
  })();

  return !!render ? (
    <Box _notLast={{ mb: 4 }} px={1}>
      <Flex alignItems={'center'} mb={1}>
        <Box position={'relative'}>
          {required && (
            <Box position={'absolute'} left={-2} top={'-1px'} color={'red.600'}>
              *
            </Box>
          )}
          {label}
        </Box>
        {description && <QuestionTip ml={2} label={description} />}
      </Flex>
      {render}
    </Box>
  ) : null;
};

export default RenderPluginInput;
