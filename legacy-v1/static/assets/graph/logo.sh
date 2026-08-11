#!/bin/bash

# Rename function
rename_file() {
    old_name="$1"
    new_name="$2"
    mv "$old_name" "$new_name"
    echo "Renamed: $old_name -> $new_name"
}

# Rename grafismos_circulos files
for i in {1..6}; do
    for color in azulClaro azulEscuro white gray black; do
        old_name="grafismos_circulos_${i}_"
        case $color in
            azulClaro) old_name+="azulClarinho";;
            azulEscuro) old_name+="azulEscuro";;
            white) old_name+="branco";;
            gray) old_name+="cinza";;
            black) old_name+="preto";;
        esac
        old_name+=".svg"
        new_name="graphic_circles_${i}_${color}.svg"
        rename_file "$old_name" "$new_name"
    done
done

# Rename linhas files
for color in azulClaro azulClaro azulEscuro white gray black green; do
    old_name="linhas_"
    case $color in
        azulClaro) 
            if [ -e "linhas_azulClarinho.svg" ]; then
                old_name+="azulClarinho"
            else
                old_name+="azulClaro"
            fi
            ;;
        azulEscuro) old_name+="azulEscuro";;
        white) old_name+="brancas";;
        gray) old_name+="cinza";;
        black) old_name+="preto";;
        green) old_name+="verde";;
    esac
    old_name+=".svg"
    new_name="lines_${color}.svg"
    rename_file "$old_name" "$new_name"
done

# Rename degrade.svg
rename_file "degrade.svg" "gradient.svg"