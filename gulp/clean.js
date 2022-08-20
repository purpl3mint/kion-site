import { deleteSync as del } from 'del'

export function cleanBuild() {
    return del('build')
}

export function cleanReport() {
    return del('reports')
}