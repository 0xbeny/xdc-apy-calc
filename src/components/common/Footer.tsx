import { Button } from '~/components/ui/button'

import { name, repository } from '../../../package.json'

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* 主要内容 */}
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
            <span>Made with ❤️ by</span>
            <a
              href="https://github.com/0xbeny"
              target="_blank"
              rel="noopener noreferrer"
              className="h-auto p-0 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium flex items-center space-x-1"
            >
              <i className="i-mingcute-github-line text-base" />
              <span>@0xbeny</span>
            </a>
          </div>

          {/* 版权信息 */}
          <div className="text-xs text-text-tertiary text-center">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
