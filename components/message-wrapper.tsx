'use client'
import { copyToClipboard } from '@/lib/utils'
import { Save } from 'lucide-react'
import { useTheme } from 'next-themes'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import remarkGfm from 'remark-gfm'
import {
  atomDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'

interface MessageWrapperProps {
  content: string
}

const MessageWrapper = ({ content }: MessageWrapperProps) => {
  const { theme } = useTheme()
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        blockquote: ({ node, className, ...props }) => {
          return (
            <blockquote
              className='pl-2 my-2 border-l-4 border-muted-foreground'
              {...props}
            />
          )
        },
        pre: ({ node, className, ...props }) => {
          return (
            <div className=' w-full my-2 '>
              <pre
                {...props}
                className='whitespace-pre-wrap rounded-md'
              />
            </div>
          )
        },
        code: ({ node, className, ref, children, ...props }) => {
          const hasLang = /language-(\w+)/.exec(className || '')

          return hasLang ? (
            <>
              <div className='py-2 rounded-t-md w-full bg-secondary flex items-center justify-between'>
                <span className='ml-3 text-muted-foreground text-sm'>
                  {hasLang[1]}
                </span>
                <button
                  className='flex items-center text-sm text-muted-foreground mr-3 hover:text-primary-foreground transition'
                  onClick={() =>
                    copyToClipboard(
                      String(children).replace(/\n$/, ''),
                    )
                  }
                >
                  <Save className='w-4 h-4 mr-1' />
                  Copy code
                </button>
              </div>
              <SyntaxHighlighter
                {...props}
                // eslint-disable-next-line react/no-children-prop
                children={String(children).replace(/\n$/, '')}
                style={theme === 'light' ? oneLight : atomDark}
                language={hasLang[1]}
                PreTag='div'
                customStyle={{
                  margin: '0',
                  borderRadius: '0',
                  borderBottomLeftRadius: 'calc(var(--radius) - 2px)',
                  borderBottomRightRadius:
                    'calc(var(--radius) - 2px)',
                }}
              />
            </>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
        ul: ({ node, className, ...props }) => (
          <ul className='list-disc space-y-2 py-2' {...props} />
        ),
        ol: ({ node, className, ...props }) => (
          <ol className='list-decimal space-y-2 py-2' {...props} />
        ),
        li: ({ node, className, ...props }) => (
          <li className='ml-4' {...props} />
        ),
      }}
    >
      {content}
    </Markdown>
  )
}

export default MessageWrapper
