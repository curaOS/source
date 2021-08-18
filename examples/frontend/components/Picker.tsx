// @ts-nocheck
/** @jsxImportSource theme-ui */
import { Text } from 'theme-ui'

const ALLOWED_EMOJIS = [
    128995, // 🟣
    128993, // 🟡️
    9899, // ⚫️
    9898, // ⚪️
    128308, // 🔴
    128992, // 🟠
    128994, // 🟢
    128309, // 🔵
    128996, // 🟤
    128999, // 🟧
    129000, // 🟨
    11035, // ⬛
    128997, // 🟥
    129001, // 🟩
    128998, // 🟦
    129002, // 🟪
    129003, // 🟫
    11036, // ⬜
]

export default function CustomEmojiPicker({ onEmojiPick }) {
    return (
        <div>
            {ALLOWED_EMOJIS.map((emojiCode) => {
                return (
                    <Text
                        mx="2"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => onEmojiPick(emojiCode)}
                    >
                        {String.fromCodePoint(emojiCode)}
                    </Text>
                )
            })}
        </div>
    )
}
