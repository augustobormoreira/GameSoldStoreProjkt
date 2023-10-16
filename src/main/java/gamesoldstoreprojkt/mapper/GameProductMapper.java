package gamesoldstoreprojkt.mapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import gamesoldstoreprojkt.Model.GameProduct;
import gamesoldstoreprojkt.Model.DTOModels.GameProductDTO;


@Mapper
public interface GameProductMapper {
    
    GameProductMapper INSTANCE =  Mappers.getMapper(GameProductMapper.class);

    GameProduct toModel(GameProductDTO gameProductDTO);

    GameProductDTO toDTO(GameProduct gameProduct);
}
