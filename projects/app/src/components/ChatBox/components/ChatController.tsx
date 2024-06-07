import { useCopyData } from '@/web/common/hooks/useCopyData';
import { Box, Flex, FlexProps, Image, css, useTheme } from '@chakra-ui/react';
import { ChatSiteItemType } from '@fastgpt/global/core/chat/type';
import MyTooltip from '@fastgpt/web/components/common/MyTooltip';
import React, { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import MyIcon from '@fastgpt/web/components/common/Icon';
import { formatChatValue2InputType } from '../utils';
import { ChatRoleEnum } from '@fastgpt/global/core/chat/constants';
import { ChatBoxContext } from '../Provider';
import { useContextSelector } from 'use-context-selector';

export type ChatControllerProps = {
  isLastChild: boolean;
  chat: ChatSiteItemType;
  showVoiceIcon?: boolean;
  onRetry?: () => void;
  onDelete?: () => void;
  onMark?: () => void;
  onReadUserDislike?: () => void;
  onCloseUserLike?: () => void;
  onAddUserLike?: () => void;
  onAddUserDislike?: () => void;
};

const ChatController = ({
  chat,
  isLastChild,
  showVoiceIcon,
  onReadUserDislike,
  onCloseUserLike,
  onMark,
  onRetry,
  onDelete,
  onAddUserDislike,
  onAddUserLike
}: ChatControllerProps & FlexProps) => {
 
  const theme = useTheme();
  const {
    isChatting,
    setChatHistories,
    audioLoading,
    audioPlaying,
    hasAudio,
    playAudioByText,
    cancelAudio,
    audioPlayingChatId,
    setAudioPlayingChatId
  } = useContextSelector(ChatBoxContext, (v) => v);

  const controlIconStyle = {
    w: '16px',
    cursor: 'pointer',
    p: '5px',
    bg: 'transparent',
  };
  const controlContainerStyle = {
    className: 'control',
    color: '#666666',
    display: 'flex'
  };

  const { t } = useTranslation();
  const { copyData } = useCopyData();

  const chatText = useMemo(() => formatChatValue2InputType(chat.value).text || '', [chat.value]);

  return (
    <Flex
      {...controlContainerStyle}
      overflow={'hidden'}
      marginTop={'10px'}
      justifyContent={ chat.obj === ChatRoleEnum.AI ? 'flex-start' : 'flex-end' }
    >
      <MyTooltip label={t('common.Copy')}>
        <MyIcon
          {...controlIconStyle}
          name={'copy2'}
          onClick={() => copyData(chatText)}
        />
      </MyTooltip>
      {/* {!!onDelete && !isChatting && (
        <>
          {onRetry && (
            <MyTooltip label={t('core.chat.retry')}>
              <MyIcon
                {...controlIconStyle}
                name={'common/retryLight'}
                _hover={{ color: 'green.500' }}
                onClick={onRetry}
              />
            </MyTooltip>
          )}
          <MyTooltip label={t('common.Delete')}>
            <MyIcon
              {...controlIconStyle}
              name={'delete'}
              _hover={{ color: 'red.600' }}
              onClick={onDelete}
            />
          </MyTooltip>
        </>
      )} */}
      {/* {showVoiceIcon &&
        hasAudio &&
        (() => {
          const isPlayingChat = chat.dataId === audioPlayingChatId;
          if (isPlayingChat && audioPlaying) {
            return (
              <Flex alignItems={'center'}>
                <MyTooltip label={t('core.chat.tts.Stop Speech')}>
                  <MyIcon
                    {...controlIconStyle}
                    borderRight={'none'}
                    name={'core/chat/stopSpeech'}
                    color={'#E74694'}
                    onClick={cancelAudio}
                  />
                </MyTooltip>
                <Image
                  src="/icon/speaking.gif"
                  w={'23px'}
                  alt={''}
                  borderRight={theme.borders.base}
                />
              </Flex>
            );
          }
          if (isPlayingChat && audioLoading) {
            return (
              <MyTooltip label={t('common.Loading')}>
                <MyIcon {...controlIconStyle} name={'common/loading'} />
              </MyTooltip>
            );
          }
          return (
            <MyTooltip label={t('core.app.TTS start')}>
              <MyIcon
                {...controlIconStyle}
                name={'common/voiceLight'}
                _hover={{ color: '#E74694' }}
                onClick={async () => {
                  setAudioPlayingChatId(chat.dataId);
                  const response = await playAudioByText({
                    buffer: chat.ttsBuffer,
                    text: chatText
                  });

                  if (!setChatHistories || !response.buffer) return;
                  setChatHistories((state) =>
                    state.map((item) =>
                      item.dataId === chat.dataId
                        ? {
                            ...item,
                            ttsBuffer: response.buffer
                          }
                        : item
                    )
                  );
                }}
              />
            </MyTooltip>
          );
        })()} */}
      {/* {!!onMark && (
        <MyTooltip label={t('core.chat.Mark')}>
          <MyIcon
            {...controlIconStyle}
            name={'core/app/markLight'}
            _hover={{ color: '#67c13b' }}
            onClick={onMark}
          />
        </MyTooltip>
      )} */}
      {chat.obj === ChatRoleEnum.AI && (
        <>
          {!!onCloseUserLike && chat.userGoodFeedback && (
            <MyTooltip label={t('core.chat.feedback.Close User Like')}>
              <MyIcon
                {...controlIconStyle}
                color={'#E5281B'}
                fontWeight={'bold'}
                name={'core/chat/feedback/like'}
                onClick={onCloseUserLike}
              />
            </MyTooltip>
          )}
          {!!onReadUserDislike && chat.userBadFeedback && (
            <MyTooltip label={t('core.chat.feedback.Read User dislike')}>
              <MyIcon
                {...controlIconStyle}
                color={'#E5281B'}
                fontWeight={'bold'}
                name={'core/chat/feedback/dislike'}
                onClick={onReadUserDislike}
              />
            </MyTooltip>
          )}
          {!!onAddUserLike && (
            <MyIcon
              {...controlIconStyle}
              {...(!!chat.userGoodFeedback
                ? {
                    color: '#E5281B',
                    fontWeight: 'bold'
                  }
                : {
                    _hover: { color: '#E5281B' }
                  })}
              name={'core/chat/feedback/like'}
              onClick={onAddUserLike}
            />
          )}
          {!!onAddUserDislike && (
            <MyIcon
              {...controlIconStyle}
              {...(!!chat.userBadFeedback
                ? {
                    color: '#E5281B',
                    fontWeight: 'bold',
                    onClick: onAddUserDislike
                  }
                : {
                    _hover: { color: '#E5281B' },
                    onClick: onAddUserDislike
                  })}
              name={'core/chat/feedback/dislike'}
            />
          )}
        </>
      )}
    </Flex>
  );
};

export default React.memo(ChatController);
