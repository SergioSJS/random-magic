#!/usr/bin/env python3
"""
Script para gerar ícones PNG para PWA a partir do favicon.svg
Requer: pip install cairosvg pillow
"""

try:
    import cairosvg
    from PIL import Image
    import os

    # Caminhos
    svg_path = 'public/favicon.svg'
    output_dir = 'public'
    
    # Tamanhos necessários
    sizes = [192, 512]
    
    for size in sizes:
        output_path = f'{output_dir}/icon-{size}.png'
        
        # Converter SVG para PNG
        cairosvg.svg2png(
            url=svg_path,
            write_to=output_path,
            output_width=size,
            output_height=size
        )
        
        print(f'✓ Gerado: {output_path} ({size}x{size})')
    
    print('\n✅ Ícones gerados com sucesso!')
    
except ImportError:
    print('❌ Erro: Bibliotecas necessárias não instaladas.')
    print('Instale com: pip install cairosvg pillow')
except Exception as e:
    print(f'❌ Erro ao gerar ícones: {e}')
    print('\n💡 Alternativa: Use um conversor online de SVG para PNG')
    print('   ou instale as dependências: pip install cairosvg pillow')

