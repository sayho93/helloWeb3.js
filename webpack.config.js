import path from 'path'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default {
    mode: 'production', // "production" | "development" | "none"
    // 선택한 모드를 통해 webpack이 알맞은 내장 최적화를 사용
    entry: './src/index.js', // string | object | array
    // ./src 를 기본으로 함
    // 애플리케이션이 여기에서 실행되며
    // webpack이 번들링을 시작
    output: {
        // webpack이 결과를 내보내는 방법과 관련된 옵션
        path: path.resolve(__dirname, 'dist'), // string (기본값)
        // 모든 출력 파일의 대상 디렉터리는
        // 반드시 절대 경로 여야함 (Node.js의 path 모듈을 사용)
        filename: 'bundle.js', // string (기본값)
    },
}
